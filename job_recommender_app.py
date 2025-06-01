import streamlit as st
import pandas as pd
import os
import ast
from sklearn.ensemble import RandomForestClassifier
from sklearn.preprocessing import MultiLabelBinarizer

st.set_page_config(page_title="Smart Job Recommender", page_icon="🧠", layout="wide")

# ---------------------- Job Knowledge Base ----------------------
jobs = [
    {"title": "Data Scientist", "traits": {"numbers", "tech", "indoors"}, "salary": "high", "degree": "yes"},
    {"title": "Doctor", "traits": {"helping", "indoors"}, "salary": "high", "degree": "yes"},
    {"title": "Construction Worker", "traits": {"outdoors", "physical"}, "salary": "medium", "degree": "no"},
    {"title": "Teacher", "traits": {"helping", "indoors"}, "salary": "medium", "degree": "yes"},
    {"title": "Forest Ranger", "traits": {"outdoors", "nature", "physical"}, "salary": "medium", "degree": "no"},
    {"title": "Software Engineer", "traits": {"tech", "numbers", "indoors"}, "salary": "high", "degree": "yes"},
    {"title": "Nurse", "traits": {"helping", "physical", "indoors"}, "salary": "medium", "degree": "yes"},
]

# ---------------------- Trait Questions ----------------------
questions = [
    {"text": "Do you enjoy working with numbers?", "trait": "numbers"},
    {"text": "Do you enjoy helping people?", "trait": "helping"},
    {"text": "Do you like working outdoors?", "trait": "outdoors"},
    {"text": "Are you interested in technology?", "trait": "tech"},
    {"text": "Do you prefer physical activity in your job?", "trait": "physical"},
    {"text": "Do you enjoy nature?", "trait": "nature"},
    {"text": "Do you like working indoors?", "trait": "indoors"},
]

# ---------------------- User Filters ----------------------
st.title("🧠 Smart Job Recommender")
st.markdown("""
<style>
    .main { background-color: #f0f4f8; }
    h1 { color: #30475e; }
</style>
""", unsafe_allow_html=True)

st.write("Answer the questions and apply filters. We'll find the job that fits you best!")

salary_pref = st.selectbox("Preferred Salary:", ["Any", "Low", "Medium", "High"])
degree_pref = st.selectbox("Willing to get a college degree?", ["Any", "Yes", "No"])

with st.form("quiz_form"):
    st.write("### 🧩 Rate how important these traits are to you")
    weighted_traits = {}
    for q in questions:
        col1, col2 = st.columns([3, 2])
        with col1:
            wants = st.radio(q["text"], ["Yes", "No"], key=q["trait"])
        with col2:
            weight = st.slider("Importance", 0, 10, 5, key=q["trait"] + "_weight")
        if wants == "Yes":
            weighted_traits[q["trait"]] = weight

    submit = st.form_submit_button("🔍 Find My Job")

# ---------------------- Filtering & Matching ----------------------
if submit:
    filtered_jobs = jobs.copy()

    if salary_pref != "Any":
        filtered_jobs = [job for job in filtered_jobs if job["salary"].lower() == salary_pref.lower()]
    if degree_pref != "Any":
        filtered_jobs = [job for job in filtered_jobs if job["degree"] == degree_pref.lower()]

    scored_jobs = []
    for job in filtered_jobs:
        match_score = sum(weighted_traits.get(trait, 0) for trait in job["traits"])
        scored_jobs.append((job["title"], match_score))

    scored_jobs.sort(key=lambda x: x[1], reverse=True)

    if scored_jobs and scored_jobs[0][1] > 0:
        best_job = scored_jobs[0]
        st.success(f"🎯 Best match (by rule-based scoring): **{best_job[0]}** (score: {best_job[1]})")
        st.write("### 🔎 Top Matches:")
        for title, score in scored_jobs[:3]:
            st.write(f"- {title} (score: {score})")
    else:
        st.warning("No matching jobs found. Try adjusting your preferences.")

    # ---------------------- ML Model Prediction ----------------------
    model, mlb = None, None
    if os.path.exists("feedback.csv"):
        try:
            data = pd.read_csv("feedback.csv")
            mlb = MultiLabelBinarizer()
            X = mlb.fit_transform(data["traits"].apply(ast.literal_eval))
            y = data["job"]
            model = RandomForestClassifier()
            model.fit(X, y)

            user_traits = list(weighted_traits.keys())
            user_vector = mlb.transform([user_traits])
            predicted_job = model.predict(user_vector)[0]

            st.info(f"🤖 ML prediction: You might also be a great **{predicted_job}**!")
        except Exception as e:
            st.warning(f"⚠️ ML prediction skipped due to error: {str(e)}")

    # ---------------------- Feedback & Learning ----------------------
    st.write("### 📝 Help Us Improve")
    feedback_job = st.selectbox("Did you like the recommended job?", [j["title"] for j in jobs])
    if st.button("Submit Feedback"):
        user_data = {
            "traits": list(weighted_traits.keys()),
            "job": feedback_job
        }
        df = pd.DataFrame([user_data])

        if os.path.exists("feedback.csv"):
            df.to_csv("feedback.csv", mode='a', header=False, index=False)
        else:
            df.to_csv("feedback.csv", index=False)

        st.success("✅ Feedback saved! Thank you.")

# ---------------------- Model Training (Offline Optional) ----------------------
def train_model():
    if os.path.exists("feedback.csv"):
        data = pd.read_csv("feedback.csv")
        mlb = MultiLabelBinarizer()
        X = mlb.fit_transform(data["traits"].apply(ast.literal_eval))
        y = data["job"]
        model = RandomForestClassifier()
        model.fit(X, y)
        return model, mlb
    return None, None

