import streamlit as st
import pandas as pd
from sklearn.tree import DecisionTreeClassifier
import numpy as np

# Load and train model
@st.cache_data
def load_model():
    data = pd.read_csv("job_data_100.csv")
    feature_cols = data.columns[:-1].tolist()
    X = data[feature_cols]
    y = data["job"]
    model = DecisionTreeClassifier()
    model.fit(X, y)
    return model, feature_cols, model.classes_

model, features, classes = load_model()

st.title("🔮 AI Job Recommender")
st.write("Answer a few yes/no questions and let the AI suggest a career for you!")

# Friendly labels for questions
friendly_labels = {
    "likes_math": "Do you like math?",
    "likes_outdoors": "Do you like working outdoors?",
    "likes_helping": "Do you like helping people?",
    "likes_creativity": "Do you enjoy being creative?",
    "likes_computers": "Do you enjoy working with computers?",
    "likes_leadership": "Do you like taking leadership roles?"
}

user_answers = []
for feature in features:
    label = friendly_labels.get(feature, feature)
    answer = st.radio(label, [1, 0], format_func=lambda x: "Yes" if x == 1 else "No")
    user_answers.append(answer)

# Predict button
if st.button("🎯 Suggest a Job"):
    probs = model.predict_proba([user_answers])[0]
    top_idx = np.argmax(probs)
    top_job = classes[top_idx]
    confidence = probs[top_idx] * 100

    st.success(f"✅ Best Match: **{top_job}** ({confidence:.1f}% confidence)")

    # Show top 5 matches
    st.subheader("🧠 Other Possible Jobs:")
    top5_indices = probs.argsort()[-5:][::-1]
    for idx in top5_indices:
        st.write(f"• {classes[idx]} – {probs[idx]*100:.1f}%")
