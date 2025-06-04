import streamlit as st
import pandas as pd
import time
import openai
from fpdf import FPDF
from PIL import Image
import base64
import altair as alt
import io

# ---------------------- OpenAI API Key ----------------------
openai.api_key = st.secrets.get("OPENAI_API_KEY") or "your-api-key-here"

# ---------------------- Data ----------------------
college_course_job_map = {
    "IIT Bombay - Computer Science": ["Software Engineer", "Data Scientist", "AI Researcher"],
    "IIM Ahmedabad - MBA": ["Business Analyst", "Marketing Manager", "Operations Lead"],
    "NIFT Delhi - Fashion Design": ["Fashion Designer", "Stylist", "Product Developer"],
    "St. Xavier's Mumbai - Psychology": ["Counselor", "HR Specialist", "UX Researcher"],
    "AIIMS Delhi - Medicine": ["Doctor", "Medical Researcher", "Healthcare Consultant"],
    "NLSIU Bangalore - Law": ["Corporate Lawyer", "Legal Advisor", "Policy Analyst"]
}

job_salary_map = {
    "Software Engineer": "₹8-30 LPA",
    "Data Scientist": "₹10-35 LPA",
    "AI Researcher": "₹12-40 LPA",
    "Business Analyst": "₹6-20 LPA",
    "Marketing Manager": "₹8-25 LPA",
    "Operations Lead": "₹10-30 LPA",
    "Fashion Designer": "₹3-15 LPA",
    "Stylist": "₹2-10 LPA",
    "Product Developer": "₹4-18 LPA",
    "Counselor": "₹3-12 LPA",
    "HR Specialist": "₹4-16 LPA",
    "UX Researcher": "₹6-22 LPA",
    "Doctor": "₹10-50 LPA",
    "Medical Researcher": "₹8-25 LPA",
    "Healthcare Consultant": "₹7-20 LPA",
    "Corporate Lawyer": "₹10-40 LPA",
    "Legal Advisor": "₹6-25 LPA",
    "Policy Analyst": "₹5-20 LPA"
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

# Map jobs to comic images (make sure these exist in your folder)
job_comics = {
    "Software Engineer": "comics/software_engineer.png",
    "Data Scientist": "comics/data_scientist.png",
    "AI Researcher": "comics/ai_researcher.png",
    "Business Analyst": "comics/business_analyst.png",
    "Marketing Manager": "comics/marketing_manager.png",
    "Operations Lead": "comics/operations_lead.png",
    "Fashion Designer": "comics/fashion_designer.png",
    "Stylist": "comics/stylist.png",
    "Product Developer": "comics/product_developer.png",
    "Counselor": "comics/counselor.png",
    "HR Specialist": "comics/hr_specialist.png",
    "UX Researcher": "comics/ux_researcher.png",
    "Doctor": "comics/doctor.png",
    "Medical Researcher": "comics/medical_researcher.png",
    "Healthcare Consultant": "comics/healthcare_consultant.png",
    "Corporate Lawyer": "comics/corporate_lawyer.png",
    "Legal Advisor": "comics/legal_advisor.png",
    "Policy Analyst": "comics/policy_analyst.png"
}

# ---------------------- Streamlit App ----------------------
st.set_page_config(page_title="Jobzilla AI", layout="wide")
st.title("🦖 Jobzilla AI – Your Career Companion")

with st.sidebar:
    st.header("🔧 Customize Jobzilla")
    user_name = st.text_input("👤 Your Name")
    grade = st.selectbox("🎓 Current Level", ["9", "10", "11", "12", "Undergraduate", "Postgraduate"])
    fav_subjects = st.multiselect("📘 Favorite Subjects", ["Math", "Biology", "Art", "Economics", "Physics", "History", "English", "Psychology", "Computer Science"])
    skills = st.text_area("🛠 Skills (comma-separated)")
    dream_job = st.text_input("🌟 Dream Job (optional)")
    college_choice = st.selectbox("🏫 College + Course", list(college_course_job_map.keys()))
    location_pref = st.text_input("📍Preferred Job Location")
    start = st.button("🔮 Show Jobzilla Suggestions")

if start:
    st.success(f"Hi {user_name or 'Friend'}, here's what Jobzilla found for you!")
    time.sleep(1)

    suggested_jobs = college_course_job_map.get(college_choice, [])
    st.subheader("💼 Suggested Careers")
    for job in suggested_jobs:
        st.markdown(f"### {job}")
        st.write(job_description_map.get(job, "No description available."))
        st.write(f"💰 **Salary Range:** {job_salary_map.get(job, 'N/A')}")
        st.markdown("---")

    # Interactive Salary Chart with Altair
    st.subheader("📊 Salary Comparison")
    min_lpa = [int(job_salary_map[j].split('-')[0].replace('₹','')) for j in suggested_jobs]
    max_lpa = [int(job_salary_map[j].split('-')[1].replace(' LPA','')) for j in suggested_jobs]
    chart_data = pd.DataFrame({
        'Job Role': suggested_jobs * 2,
        'Salary (LPA)': min_lpa + max_lpa,
        'Type': ['Min']*len(min_lpa) + ['Max']*len(max_lpa)
    })

    chart = alt.Chart(chart_data).mark_bar().encode(
        x=alt.X('Salary (LPA):Q'),
        y=alt.Y('Job Role:N', sort='-x'),
        color='Type:N',
        tooltip=['Job Role', 'Salary (LPA)', 'Type']
    ).properties(height=400)
    st.altair_chart(chart, use_container_width=True)

    # Resume Tip
    st.subheader("📝 Resume Tip")
    skill_keywords = [s.strip() for s in skills.split(',') if s.strip()]
    resume_example = f"- Utilized {skill_keywords[0] if skill_keywords else 'core'} skills in {fav_subjects[0] if fav_subjects else 'studies'} to pursue opportunities as a {suggested_jobs[0]}"
    st.code(resume_example)

    # Career Location Advice
    st.subheader("📍 Career Location Advice")
    st.markdown(f"Jobs in **{location_pref or 'India'}** are growing in fields like **{suggested_jobs[0]}** and more. Consider local demand and growth trends.")

    # Dynamic Comic Visuals
    st.subheader("🎨 Jobzilla Comic Preview")
    for job in suggested_jobs:
        comic_file = job_comics.get(job)
        if comic_file:
            try:
                st.image(comic_file, caption=f"{job} - Career Hero 🦖")
            except Exception:
                st.warning(f"Comic image for {job} not found.")
        else:
            st.info(f"No comic available for {job}.")

    # Enhanced PDF Report with Images
    st.subheader("📤 Download Your Report (PDF)")
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", size=14)
    pdf.cell(0, 10, f"Jobzilla Report for {user_name or 'Student'}", ln=True, align='C')
    pdf.ln(10)
    pdf.set_font("Arial", size=12)
    pdf.cell(0, 10, f"College Chosen: {college_choice}", ln=True)
    pdf.ln(5)
    for job in suggested_jobs:
        pdf.cell(0, 10, f"- {job}: {job_description_map.get(job)} (Salary: {job_salary_map.get(job)})", ln=True)
        # Add comic image if exists
        comic_file = job_comics.get(job)
        if comic_file:
            try:
                pdf.image(comic_file, w=50)
                pdf.ln(55)
            except:
                pass
    pdf_output = f"{user_name or 'Jobzilla'}_report.pdf"
    pdf_buffer = io.BytesIO()
    pdf.output(pdf_buffer)
    pdf_bytes = pdf_buffer.getvalue()
    b64 = base64.b64encode(pdf_bytes).decode()
    href = f'<a href="data:application/pdf;base64,{b64}" download="{pdf_output}">📄 Download PDF</a>'
    st.markdown(href, unsafe_allow_html=True)

    # Improved AI Q&A with Example Questions Dropdown
    st.subheader("🤖 Ask Jobzilla (powered by OpenAI)")
    example_questions = [
        "What jobs can I get with a Computer Science degree?",
        "What skills do I need to become a Data Scientist?",
        "How do I prepare for a career in Medicine?",
        "What are the job prospects after an MBA?",
        "Can you suggest resume tips for a Marketing Manager?"
    ]
    user_question = st.selectbox("Choose a question or type your own:", [""] + example_questions)
    if user_question:
        try:
            response = openai.ChatCompletion.create(
                model="gpt-4",
                messages=[
                    {"role": "system", "content": "You are Jobzilla, a friendly career advisor for students in India."},
                    {"role": "user", "content": user_question}
                ]
            )
            st.write(response["choices"][0]["message"]["content"])
        except Exception as e:
            st.error("OpenAI API Error: " + str(e))


