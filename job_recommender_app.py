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

def extract_min_max(salary_str):
    try:
        parts = salary_str.replace(' LPA', '').split('-')
        min_val = int(parts[0].strip())
        max_val = int(parts[1].strip())
        return min_val, max_val
    except:
        return None, None

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
st.title("\U0001F996 Jobzilla AI – Your Career Companion")

# Animation
lottie_career = load_lottieurl("https://lottie.host/8d234c52-0ff4-49a3-b9c7-64d688a3ad2c/3oCvOnqQMQ.json")
if lottie_career:
    st_lottie(lottie_career, height=250, speed=1.2)
else:
    st.info("Animation could not be loaded.")

# Profile Input
st.header("Customize Jobzilla")
user_name = st.text_input("\U0001F464 Your Name")
grade = st.selectbox("\U0001F393 Current Level", ["9", "10", "11", "12", "Undergraduate", "Postgraduate"])
fav_subjects = st.multiselect("\U0001F4D8 Favorite Subjects", ["Math", "Biology", "Art", "Economics", "Physics", "History", "English", "Psychology", "Computer Science"])
skills = st.text_area("\U0001F6E0 Skills (comma-separated)")
dream_job = st.text_input("\U0001F31F Dream Job (optional)")
location_pref = st.text_input("\U0001F4CD Preferred Job Location")
start = st.button("\U0001F52E Show Jobzilla Suggestions")

# ---------------------- Main Logic ----------------------
if start:
    st.success(f"Hi {user_name or 'Friend'}, here's what Jobzilla found for you!")
    time.sleep(1.5)

    suggestions = []
    for job in job_description_map:
        if dream_job.lower() in job.lower() or any(subj.lower() in job.lower() for subj in fav_subjects):
            suggestions.append(job)
    if not suggestions:
        suggestions = list(job_description_map.keys())[:5]

    st.subheader("\U0001F4BC Suggested Careers")
    for job in suggestions:
        with st.container():
            st.markdown(f"#### \U0001F3AF {job}")
            st.markdown(f"**Description:** {job_description_map.get(job)}")
            st.markdown(f"**\U0001F4B0 Salary Range:** {job_salary_map.get(job)}")
            st.markdown("---")

    # Salary Chart
    st.subheader("\U0001F4CA Salary Comparison")
    min_lpa, max_lpa = [], []
    for job in suggestions:
        sal_str = job_salary_map.get(job, "")
        min_val, max_val = extract_min_max(sal_str)
        min_lpa.append(min_val)
        max_lpa.append(max_val)

    chart_data = pd.DataFrame({
        'Job Role': suggestions,
        'Minimum LPA': min_lpa,
        'Maximum LPA': max_lpa,
    })
    st.bar_chart(chart_data.set_index("Job Role"))

    # Resume Tip
    st.subheader("\U0001F4DD Resume Tip")
    skill_keywords = [s.strip() for s in skills.split(',') if s.strip()]
    if skill_keywords and fav_subjects:
        resume_example = f"- Utilized {skill_keywords[0]} skills in {fav_subjects[0]} to explore careers in {suggestions[0]}"
    else:
        resume_example = f"- Passionate about learning and applying knowledge to grow in the field of {suggestions[0]}"
    st.code(resume_example)

    # Location Advice
    st.subheader("\U0001F4CD Career Location Advice")
    st.markdown(f"Jobs in **{location_pref or 'India'}** are growing in fields like **{suggestions[0]}**.")

    # PDF Report
    st.subheader("\U0001F4C4 Download Your Report (PDF)")
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=12)
    pdf.cell(200, 10, txt=f"Jobzilla Report for {user_name or 'Student'}", ln=True, align='C')
    for job in suggestions:
        desc = job_description_map.get(job, "")
        sal = job_salary_map.get(job, "")
        line = f"- {job}: {desc} (Salary: {sal})"
        pdf.multi_cell(0, 10, txt=line)
    pdf_output = f"{user_name or 'Jobzilla'}_report.pdf"
    pdf.output(pdf_output, "F")
    with open(pdf_output, "rb") as f:
        b64 = base64.b64encode(f.read()).decode()
        href = f'<a href="data:application/pdf;base64,{b64}" download="{pdf_output}">\U0001F4C4 Download PDF</a>'
        st.markdown(href, unsafe_allow_html=True)

    # Chatbot
    st.subheader("\U0001F916 Ask Jobzilla")
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
