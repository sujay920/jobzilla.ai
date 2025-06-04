import streamlit as st
import pandas as pd
import openai
from fpdf import FPDF
import base64
import difflib
import re

# ---- OpenAI API Key Setup ----
openai.api_key = st.secrets.get("OPENAI_API_KEY") or "your-api-key-here"

# ---- Jobs Data (Sample 200+ realistic jobs with salaries & descriptions) ----
# For brevity here, let's create a sample smaller list. In your actual app, expand this list similarly.
jobs_data = [
    {"job": "Software Engineer", "salary": "₹8-30 LPA", "desc": "Develop and maintain software applications."},
    {"job": "Data Scientist", "salary": "₹10-35 LPA", "desc": "Analyze data to generate insights."},
    {"job": "AI Researcher", "salary": "₹12-40 LPA", "desc": "Research and develop AI technologies."},
    {"job": "Business Analyst", "salary": "₹6-20 LPA", "desc": "Analyze business needs and propose solutions."},
    {"job": "Marketing Manager", "salary": "₹8-25 LPA", "desc": "Plan and execute marketing campaigns."},
    {"job": "Doctor", "salary": "₹10-50 LPA", "desc": "Provide medical care and treatment."},
    {"job": "Civil Engineer", "salary": "₹5-20 LPA", "desc": "Design and supervise construction projects."},
    {"job": "Graphic Designer", "salary": "₹3-12 LPA", "desc": "Create visual content and branding."},
    {"job": "HR Specialist", "salary": "₹4-16 LPA", "desc": "Manage recruitment and employee relations."},
    {"job": "UX Designer", "salary": "₹6-22 LPA", "desc": "Improve user experience through design."},
    # Add as many as needed, up to 200+ realistic roles...
]

# ---- Utility Functions ----

def sanitize_text(text):
    # Remove unsupported characters for PDF
    return re.sub(r'[^\x00-\x7F]+', '', text)

def filter_jobs_by_similarity(user_skills, dream_job):
    # Combine user input to match job roles
    combined_text = (", ".join(user_skills) + " " + dream_job).lower()

    filtered = []
    for job_entry in jobs_data:
        job_lower = job_entry["job"].lower()
        # Calculate similarity ratio
        ratio = difflib.SequenceMatcher(None, combined_text, job_lower).ratio()
        if ratio >= 0.6:
            filtered.append((job_entry, ratio))
    # Sort by highest similarity
    filtered.sort(key=lambda x: x[1], reverse=True)
    return [j[0] for j in filtered]

# ---- Streamlit Page Config and CSS ----

st.set_page_config(page_title="Jobzilla AI", layout="wide")

st.markdown(
    """
    <style>
    /* Button Styles */
    div.stButton > button:first-child {
        background-color: #4CAF50;
        color: white;
        font-weight: 700;
        padding: 15px 30px;
        font-size: 22px;
        border-radius: 10px;
        border: none;
        width: 100%;
        cursor: pointer;
        transition: background-color 0.3s ease;
        margin-top: 15px;
    }
    div.stButton > button:first-child:hover {
        background-color: #45a049;
    }

    .ai-btn button {
        background-color: #f4511e !important;
        color: white !important;
        font-size: 22px !important;
        font-weight: 700 !important;
        padding: 15px 30px !important;
        border-radius: 10px !important;
        border: none !important;
        width: 100% !important;
        cursor: pointer !important;
        transition: background-color 0.3s ease !important;
        margin-top: 15px !important;
    }
    .ai-btn button:hover {
        background-color: #d43c0d !important;
    }

    /* Layout */
    .profile-section, .jobs-section, .ai-section {
        padding: 20px;
        border-radius: 15px;
        background: #f0f2f6;
        margin-bottom: 30px;
        box-shadow: 0 4px 10px rgba(0,0,0,0.05);
    }

    .jobs-section h3, .profile-section h3, .ai-section h3 {
        color: #333;
        margin-bottom: 15px;
    }

    .job-card {
        background: white;
        padding: 15px;
        border-radius: 12px;
        box-shadow: 0 2px 6px rgba(0,0,0,0.1);
        margin-bottom: 15px;
    }

    </style>
    """,
    unsafe_allow_html=True,
)

# ---- App Title ----
st.title("🦖 Jobzilla AI — Your Ultimate Career Companion")

# ---- Profile Form ----
with st.form(key="profile_form"):
    st.header("👤 Build Your Profile")
    user_name = st.text_input("Your Name")
    grade = st.selectbox("Current Level", ["9", "10", "11", "12", "Undergraduate", "Postgraduate"])
    fav_subjects = st.multiselect("Favorite Subjects", ["Math", "Biology", "Art", "Economics", "Physics", "History", "English", "Psychology", "Computer Science"])
    skills_text = st.text_area("Skills (comma-separated)", placeholder="e.g. Python, Data Analysis, Communication")
    dream_job = st.text_input("Dream Job (optional)")
    location_pref = st.text_input("Preferred Job Location (optional)")

    submit_profile = st.form_submit_button("🔮 Show Job Suggestions")

if submit_profile:
    if not user_name or not skills_text:
        st.warning("Please fill in your name and at least one skill to get job suggestions.")
    else:
        user_skills = [s.strip() for s in skills_text.split(",") if s.strip()]
        matched_jobs = filter_jobs_by_similarity(user_skills, dream_job)

        st.markdown('<div class="jobs-section">', unsafe_allow_html=True)
        st.subheader(f"💼 Job Suggestions for {user_name}")

        if not matched_jobs:
            st.info("No jobs matched your profile closely. Try broadening your skills or dream job description.")
        else:
            for job in matched_jobs[:10]:  # Limit display to top 10 matches
                st.markdown(f'<div class="job-card">', unsafe_allow_html=True)
                st.markdown(f"### {job['job']}")
                st.write(job['desc'])
                st.write(f"💰 **Salary Range:** {job['salary']}")
                st.markdown("</div>", unsafe_allow_html=True)

            # PDF report generation
            pdf = FPDF()
            pdf.add_page()
            pdf.set_font("Arial", size=14)
            pdf.cell(0, 12, f"Jobzilla Report for {sanitize_text(user_name)}", ln=True, align='C')
            pdf.ln(10)
            pdf.set_font("Arial", size=12)
            pdf.cell(0, 10, "Profile Summary:", ln=True)
            pdf.cell(0, 10, f"Grade: {grade}", ln=True)
            pdf.cell(0, 10, f"Favorite Subjects: {', '.join(fav_subjects)}", ln=True)
            pdf.cell(0, 10, f"Skills: {', '.join(user_skills)}", ln=True)
            pdf.cell(0, 10, f"Dream Job: {sanitize_text(dream_job)}", ln=True)
            pdf.cell(0, 10, f"Preferred Location: {sanitize_text(location_pref)}", ln=True)
            pdf.ln(10)
            pdf.cell(0, 10, "Suggested Jobs:", ln=True)
            for job in matched_jobs[:10]:
                job_desc = sanitize_text(job['desc'])
                pdf.cell(0, 10, f"- {job['job']}: {job_desc} (Salary: {job['salary']})", ln=True)

            pdf_output = f"{sanitize_text(user_name)}_Jobzilla_Report.pdf"
            pdf.output(pdf_output)

            with open(pdf_output, "rb") as f:
                b64 = base64.b64encode(f.read()).decode()
                href = f'<a href="data:application/pdf;base64,{b64}" download="{pdf_output}">📄 Download your detailed Jobzilla Report (PDF)</a>'
                st.markdown(href, unsafe_allow_html=True)
        st.markdown('</div>', unsafe_allow_html=True)

# ---- AI Chatbot Section ----
st.markdown('<div class="ai-section">', unsafe_allow_html=True)
st.header("🤖 Ask Jobzilla AI")

user_question = st.text_input("Type your career-related question here", placeholder="E.g. What skills do I need to become a Data Scientist?")

col1, col2, col3 = st.columns([3,2,3])
with col2:
    ask = st.button("Ask Jobzilla", key="ask_button", help="Ask Jobzilla AI your question", args=None, kwargs=None)

if ask:
    if not user_question.strip():
        st.warning("Please enter a question to ask Jobzilla AI.")
    else:
        try:
            with st.spinner("Jobzilla is thinking..."):
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[
                        {"role": "system", "content": "You are Jobzilla, a helpful, friendly career advisor for students in India."},
                        {"role": "user", "content": user_question}
                    ],
                    temperature=0.7,
                    max_tokens=400,
                )
                answer = response.choices[0].message.content.strip()
                st.success(answer)
        except Exception as e:
            st.error(f"OpenAI API error: {str(e)}")

st.markdown('</div>', unsafe_allow_html=True)
