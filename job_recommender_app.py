import streamlit as st
import pandas as pd
import time
import openai
from fpdf import FPDF
from PIL import Image
import base64
from streamlit_lottie import st_lottie
import requests

# ---------------------- API Key Setup ----------------------
openai.api_key = st.secrets.get("OPENAI_API_KEY") or "your-api-key-here"

# ---------------------- Helper Functions ----------------------
def load_lottieurl(url):
    try:
        r = requests.get(url)
        if r.status_code == 200:
            return r.json()
    except:
        return None
    return None

# ---------------------- Data Maps ----------------------
job_salary_map = {
    "Software Engineer": "8-30 LPA",
    "Data Scientist": "10-35 LPA",
    "AI Researcher": "12-40 LPA",
    "Business Analyst": "6-20 LPA",
    "Marketing Manager": "8-25 LPA",
    "Operations Lead": "10-30 LPA",
    "Fashion Designer": "3-15 LPA",
    "Stylist": "2-10 LPA",
    "Product Developer": "4-18 LPA",
    "Counselor": "3-12 LPA",
    "HR Specialist": "4-16 LPA",
    "UX Researcher": "6-22 LPA",
    "Doctor": "10-50 LPA",
    "Medical Researcher": "8-25 LPA",
    "Healthcare Consultant": "7-20 LPA",
    "Corporate Lawyer": "10-40 LPA",
    "Legal Advisor": "6-25 LPA",
    "Policy Analyst": "5-20 LPA"
}

job_description_map = {
    "Software Engineer": "Develop and maintain software applications and systems.",
    "Data Scientist": "Analyze data to gain insights and support decision-making.",
    "AI Researcher": "Design AI models and research machine learning innovations.",
    "Business Analyst": "Identify business needs and recommend solutions.",
    "Marketing Manager": "Develop strategies to promote products and services.",
    "Operations Lead": "Manage and optimize business operations.",
    "Fashion Designer": "Create clothing and accessories based on trends.",
    "Stylist": "Coordinate outfits for clients and fashion shoots.",
    "Product Developer": "Design and improve products from concept to launch.",
    "Counselor": "Provide mental health support and guidance.",
    "HR Specialist": "Manage recruitment, employee relations, and policies.",
    "UX Researcher": "Improve user experience through research and testing.",
    "Doctor": "Diagnose and treat illnesses, improve patient health.",
    "Medical Researcher": "Conduct studies to advance medical science.",
    "Healthcare Consultant": "Advise hospitals and clinics on improving care and efficiency.",
    "Corporate Lawyer": "Handle business legal issues, contracts, and compliance.",
    "Legal Advisor": "Provide expert legal guidance to organizations.",
    "Policy Analyst": "Research and recommend public policy solutions."
}

# ---------------------- Streamlit App UI ----------------------
st.set_page_config(page_title="Jobzilla AI", layout="wide")
st.title("🦖 Jobzilla AI – Your Career Companion")

# New Animation
lottie_career = load_lottieurl("https://lottie.host/2d27e92a-bd61-4537-a5df-3f9e19a46f3f/T7sSB9yzUb.json")
if lottie_career:
    st_lottie(lottie_career, height=250, speed=1.2)
else:
    st.info(" Animation could not be loaded.")


# Profile Input (no sidebar)
st.header("Customize Jobzilla")
user_name = st.text_input("👤 Your Name")
grade = st.selectbox("🎓 Current Level", ["9", "10", "11", "12", "Undergraduate", "Postgraduate"])
fav_subjects = st.multiselect("📘 Favorite Subjects", ["Math", "Biology", "Art", "Economics", "Physics", "History", "English", "Psychology", "Computer Science"])
skills = st.text_area("🛠 Skills (comma-separated)")
dream_job = st.text_input("🌟 Dream Job (optional)")
location_pref = st.text_input("📍Preferred Job Location")
start = st.button("🔮 Show Jobzilla Suggestions")

# ---------------------- Main Logic ----------------------
if start:
    st.success(f"Hi {user_name or 'Friend'}, here's what Jobzilla found for you!")
    time.sleep(1.5)

    # Match jobs based on dream job and favorite subjects/skills
    suggestions = []
    for job in job_description_map:
        if dream_job.lower() in job.lower() or any(subj.lower() in job.lower() for subj in fav_subjects):
            suggestions.append(job)
    if not suggestions:
        suggestions = list(job_description_map.keys())[:5]

    st.subheader("💼 Suggested Careers")
    for job in suggestions:
        with st.container():
            st.markdown(f"#### 🎯 {job}")
            st.markdown(f"**Description:** {job_description_map.get(job)}")
            st.markdown(f"**💰 Salary Range:** {job_salary_map.get(job)} LPA")
            st.markdown("---")

    # Salary Chart
    st.subheader("📊 Salary Comparison")
    chart_data = pd.DataFrame({
        'Job Role': suggestions,
        'Minimum LPA': [int(job_salary_map[j].split('-')[0]) for j in suggestions],
        'Maximum LPA': [int(job_salary_map[j].split('-')[1]) for j in suggestions],
    })
    st.bar_chart(chart_data.set_index("Job Role"))

    # Resume Tip
    st.subheader("📝 Resume Tip")
    skill_keywords = [s.strip() for s in skills.split(',') if s.strip()]
    if skill_keywords and fav_subjects:
        resume_example = f"- Utilized {skill_keywords[0]} skills in {fav_subjects[0]} to explore careers in {suggestions[0]}"
    else:
        resume_example = f"- Passionate about learning and applying knowledge to grow in the field of {suggestions[0]}"
    st.code(resume_example)

    # Location Advice
    st.subheader("📍 Career Location Advice")
    st.markdown(f"Jobs in **{location_pref or 'India'}** are growing in fields like **{suggestions[0]}**.")

    # PDF Report
    st.subheader("📤 Download Your Report (PDF)")
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"Jobzilla Report for {user_name or 'Student'}", ln=True, align='C')
    for job in suggestions:
        desc = job_description_map.get(job, "")
        sal = job_salary_map.get(job, "")
        line = f"- {job}: {desc} (Salary: {sal} LPA)"
        pdf.multi_cell(0, 10, txt=line)
    pdf_output = f"{user_name or 'Jobzilla'}_report.pdf"
    pdf.output(pdf_output, "F")
    with open(pdf_output, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
        href = f'<a href="data:application/pdf;base64,{b64}" download="{pdf_output}">📄 Download PDF</a>'
        st.markdown(href, unsafe_allow_html=True)

    # Chatbot
    st.subheader("🤖 Ask Jobzilla")
    user_question = st.text_input("Ask a career question")
    if user_question:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are Jobzilla, a friendly Indian career advisor."},
                    {"role": "user", "content": user_question}
                ]
            )
            st.write(response["choices"][0]["message"]["content"])
        except Exception as e:
            st.error("OpenAI API Error: " + str(e))
