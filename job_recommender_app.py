import streamlit as st
import pandas as pd
import time
import openai
from fpdf import FPDF
import base64

# --------- OpenAI API Key ----------
openai.api_key = st.secrets.get("OPENAI_API_KEY") or "your-api-key-here"

# --------- Data ----------
college_course_job_map = {
    "IIT Bombay - Computer Science": ["Software Engineer", "Data Scientist", "AI Researcher", "Machine Learning Engineer"],
    "IIM Ahmedabad - MBA": ["Business Analyst", "Marketing Manager", "Operations Lead", "Product Manager"],
    "NIFT Delhi - Fashion Design": ["Fashion Designer", "Stylist", "Product Developer", "Fashion Merchandiser"],
    "St. Xavier's Mumbai - Psychology": ["Counselor", "HR Specialist", "UX Researcher", "Behavioral Analyst"],
    "AIIMS Delhi - Medicine": ["Doctor", "Medical Researcher", "Healthcare Consultant", "Surgeon"],
    "NLSIU Bangalore - Law": ["Corporate Lawyer", "Legal Advisor", "Policy Analyst", "Litigator"]
}

job_salary_map = {
    "Software Engineer": "₹12-35 LPA",
    "Data Scientist": "₹15-40 LPA",
    "AI Researcher": "₹18-45 LPA",
    "Machine Learning Engineer": "₹16-42 LPA",
    "Business Analyst": "₹8-22 LPA",
    "Marketing Manager": "₹10-28 LPA",
    "Operations Lead": "₹12-33 LPA",
    "Product Manager": "₹14-38 LPA",
    "Fashion Designer": "₹4-18 LPA",
    "Stylist": "₹3-12 LPA",
    "Product Developer": "₹5-20 LPA",
    "Fashion Merchandiser": "₹4-15 LPA",
    "Counselor": "₹4-14 LPA",
    "HR Specialist": "₹6-18 LPA",
    "UX Researcher": "₹8-25 LPA",
    "Behavioral Analyst": "₹7-22 LPA",
    "Doctor": "₹15-55 LPA",
    "Medical Researcher": "₹12-30 LPA",
    "Healthcare Consultant": "₹10-28 LPA",
    "Surgeon": "₹20-60 LPA",
    "Corporate Lawyer": "₹15-45 LPA",
    "Legal Advisor": "₹10-30 LPA",
    "Policy Analyst": "₹8-25 LPA",
    "Litigator": "₹12-35 LPA"
}

job_description_map = {
    "Software Engineer": "Develop and maintain software applications and systems.",
    "Data Scientist": "Analyze data to gain insights and support decision-making.",
    "AI Researcher": "Design AI models and research machine learning innovations.",
    "Machine Learning Engineer": "Build machine learning pipelines and deploy models.",
    "Business Analyst": "Identify business needs and recommend solutions.",
    "Marketing Manager": "Develop strategies to promote products and services.",
    "Operations Lead": "Manage and optimize business operations.",
    "Product Manager": "Lead product development and strategy.",
    "Fashion Designer": "Create clothing and accessories based on trends.",
    "Stylist": "Coordinate outfits for clients and fashion shoots.",
    "Product Developer": "Design and improve products from concept to launch.",
    "Fashion Merchandiser": "Plan and promote fashion product sales.",
    "Counselor": "Provide mental health support and guidance.",
    "HR Specialist": "Manage recruitment, employee relations, and policies.",
    "UX Researcher": "Improve user experience through research and testing.",
    "Behavioral Analyst": "Analyze behavior patterns to improve interventions.",
    "Doctor": "Diagnose and treat illnesses, improve patient health.",
    "Medical Researcher": "Conduct studies to advance medical science.",
    "Healthcare Consultant": "Advise hospitals and clinics on improving care and efficiency.",
    "Surgeon": "Perform surgeries to treat injuries and diseases.",
    "Corporate Lawyer": "Handle business legal issues, contracts, and compliance.",
    "Legal Advisor": "Provide expert legal guidance to organizations.",
    "Policy Analyst": "Research and recommend public policy solutions.",
    "Litigator": "Represent clients in court cases and trials."
}

# --------- Streamlit App ---------
st.set_page_config(page_title="Jobzilla AI", layout="wide")
st.title("🦖 Jobzilla AI – Your Career Companion")

# Custom styles for bigger AI question box & buttons
st.markdown("""
<style>
.big-input .stTextInput>div>input {
    height: 45px;
    font-size: 18px;
}
.ask-button button {
    background-color: #f4511e;
    color: white;
    font-size: 18px;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 10px;
    border: none;
    width: 100%;
    cursor: pointer;
    margin-top: 10px;
}
.ask-button button:hover {
    background-color: #d43c0d;
}
.show-jobs-btn button {
    background-color: #4CAF50;
    color: white;
    font-weight: bold;
    padding: 12px 28px;
    font-size: 18px;
    border-radius: 10px;
    border: none;
    cursor: pointer;
    width: 100%;
}
.show-jobs-btn button:hover {
    background-color: #45a049;
}
.job-section {
    border: 2px solid #4CAF50;
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    background-color: #f0fff0;
}
.ai-section {
    border: 2px solid #f4511e;
    border-radius: 12px;
    padding: 25px;
    background-color: #fff5f0;
    margin-top: 30px;
}
</style>
""", unsafe_allow_html=True)

# --------- User Input Form ---------
with st.form(key='profile_form'):
    st.header("👤 Build Your Profile")
    user_name = st.text_input("Your Name")
    grade = st.selectbox("Current Level", ["9", "10", "11", "12", "Undergraduate", "Postgraduate"])
    fav_subjects = st.multiselect("Favorite Subjects", ["Math", "Biology", "Art", "Economics", "Physics", "History", "English", "Psychology", "Computer Science"])
    skills = st.text_area("Skills (comma-separated)", placeholder="e.g. Python, Data Analysis, Communication")
    dream_job = st.text_input("Dream Job (optional)")
    location_pref = st.text_input("Preferred Job Location (optional)")
    submit_profile = st.form_submit_button("🔮 Show Job Suggestions", help="Get job matches based on your profile", 
                                          css_class="show-jobs-btn")

# Function to calculate match score
def calculate_match_score(user_skills, user_subjects, job_title):
    job_title = job_title.lower()
    skill_match = sum(1 for skill in user_skills if skill.lower() in job_title)
    subject_match = sum(1 for subject in user_subjects if subject.lower() in job_title)
    total_possible = len(user_skills) + len(user_subjects)
    if total_possible == 0:
        return 0
    return (skill_match + subject_match) / total_possible

# Process user input and show job suggestions
if submit_profile:
    if not user_name or not fav_subjects or not skills:
        st.error("Please fill in your Name, Favorite Subjects, and Skills to get job suggestions.")
    else:
        st.success(f"Hi {user_name}! Based on your profile, here are some job matches for you:")
        user_skills_list = [s.strip() for s in skills.split(",") if s.strip()]
        user_subjects_list = [s.strip() for s in fav_subjects if s.strip()]

        # Aggregate all jobs from all colleges (to increase options)
        all_jobs = set()
        for jobs in college_course_job_map.values():
            all_jobs.update(jobs)
        all_jobs = list(all_jobs)

        # Calculate match score per job
        job_scores = []
        for job in all_jobs:
            score = calculate_match_score(user_skills_list, user_subjects_list, job)
            job_scores.append((job, score))

        # Filter jobs by >= 60% match
        filtered_jobs = [job for job, score in job_scores if score >= 0.6]

        if not filtered_jobs:
            st.warning("No jobs matched your skills and subjects above 60%. Showing top 3 closest matches.")
            filtered_jobs = [job for job, score in sorted(job_scores, key=lambda x: x[1], reverse=True)[:3]]

        # Display jobs
        for job in filtered_jobs:
            st.markdown(f"### {job}")
            st.write(job_description_map.get(job, "No description available."))
            st.write(f"💰 **Salary Range:** {job_salary_map.get(job, 'N/A')}")
            st.markdown("---")

        # Salary bar chart
        def salary_to_tuple(s):
            try:
                parts = s.replace('₹','').replace('LPA','').split('-')
                return (int(parts[0].strip()), int(parts[1].strip()))
            except:
                return (0,0)
        min_salaries = []
        max_salaries = []
        for job in filtered_jobs:
            min_s, max_s = salary_to_tuple(job_salary_map.get(job, '0-0'))
            min_salaries.append(min_s)
            max_salaries.append(max_s)
        salary_df = pd.DataFrame({
            "Job Role": filtered_jobs,
            "Min Salary (LPA)": min_salaries,
            "Max Salary (LPA)": max_salaries
        }).set_index("Job Role")
        st.bar_chart(salary_df)

        # Resume tip
        resume_skill = user_skills_list[0] if user_skills_list else "core"
        resume_subject = user_subjects_list[0] if user_subjects_list else "studies"
        resume_example = f"- Utilized {resume_skill} skills in {resume_subject} to pursue opportunities as a {filtered_jobs[0]}"
        st.subheader("📝 Resume Tip")
        st.code(resume_example)

        # Career Location advice
        location = location_pref if location_pref else "India"
        st.subheader("📍 Career Location Advice")
        st.markdown(f"Jobs in **{location}** are growing in fields like **{filtered_jobs[0]}** and related areas. Consider local demand and growth trends.")

        # Generate PDF report bytes to avoid unicode error
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=12)
        pdf.cell(0, 10, f"Jobzilla Report for {user_name}", ln=True, align="C")
        pdf.cell(0, 10, f"Skills: {', '.join(user_skills_list)}", ln=True)
        pdf.cell(0, 10, f"Favorite Subjects: {', '.join(user_subjects_list)}", ln=True)
        pdf.ln(5)
        pdf.cell(0, 10, "Suggested Jobs:", ln=True)
        for job in filtered_jobs:
            pdf.cell(0, 10, f"- {job}: {job_description_map.get(job)} (Salary: {job_salary_map.get(job)})", ln=True)
        pdf_bytes = pdf.output(dest='S').encode('latin1')
        b64 = base64.b64encode(pdf_bytes).decode()
        href = f'<a href="data:application/pdf;base64,{b64}" download="{user_name}_Jobzilla_Report.pdf">📄 Download Your Job Report (PDF)</a>'
        st.markdown(href, unsafe_allow_html=True)

# ---------- AI Chatbot Section ----------
st.markdown('<div class="ai-section">', unsafe_allow_html=True)
st.header("🤖 Ask Jobzilla AI")
user_question = st.text_input("Type your career-related question here", key="ai_input", placeholder="E.g. What skills do I need to become a Data Scientist?")

col1, col2, col3 = st.columns([4,2,4])
with col2:
    ask_button = st.button("Ask Jobzilla", key="ask_button")

if ask_button:
    # Validate profile filled before AI question
    if not user_name or not fav_subjects or not skills:
        st.error("Please fill in your profile above (Name, Favorite Subjects, Skills) before asking Jobzilla AI.")
    elif not user_question.strip():
        st.error("Please enter a question for Jobzilla AI.")
    else:
        with st.spinner("Jobzilla is thinking..."):
            try:
                response = openai.ChatCompletion.create(
                    model="gpt-4",
                    messages=[
                        {"role": "system", "content": "You are Jobzilla, a friendly career advisor for students in India."},
                        {"role": "user", "content": user_question}
                    ],
                    max_tokens=500,
                    temperature=0.7,
                )
                answer = response['choices'][0]['message']['content']
                st.markdown(f"### Jobzilla says:")
                st.write(answer)
            except Exception as e:
                st.error(f"OpenAI API Error: {e}")

st.markdown('</div>', unsafe_allow_html=True)
