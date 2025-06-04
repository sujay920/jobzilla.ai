import streamlit as st
import pandas as pd
import openai
from fpdf import FPDF
import base64
import copy

# Set your OpenAI API key here or via Streamlit secrets
openai.api_key = st.secrets.get("OPENAI_API_KEY") or "your-api-key-here"

# ---------------------------- Data ---------------------------------

job_data = {
    "Software Engineer": {"salary": "₹8-30 LPA", "desc": "Develop and maintain software applications and systems."},
    "Data Scientist": {"salary": "₹10-35 LPA", "desc": "Analyze data to gain insights and support decision-making."},
    "AI Researcher": {"salary": "₹12-40 LPA", "desc": "Design AI models and research machine learning innovations."},
    "Business Analyst": {"salary": "₹6-20 LPA", "desc": "Identify business needs and recommend solutions."},
    "Marketing Manager": {"salary": "₹8-25 LPA", "desc": "Develop strategies to promote products and services."},
    "Operations Lead": {"salary": "₹10-30 LPA", "desc": "Manage and optimize business operations."},
    "Fashion Designer": {"salary": "₹3-15 LPA", "desc": "Create clothing and accessories based on trends."},
    "Stylist": {"salary": "₹2-10 LPA", "desc": "Coordinate outfits for clients and fashion shoots."},
    "Product Developer": {"salary": "₹4-18 LPA", "desc": "Design and improve products from concept to launch."},
    "Counselor": {"salary": "₹3-12 LPA", "desc": "Provide mental health support and guidance."},
    "HR Specialist": {"salary": "₹4-16 LPA", "desc": "Manage recruitment, employee relations, and policies."},
    "UX Researcher": {"salary": "₹6-22 LPA", "desc": "Improve user experience through research and testing."},
    "Doctor": {"salary": "₹10-50 LPA", "desc": "Diagnose and treat illnesses, improve patient health."},
    "Medical Researcher": {"salary": "₹8-25 LPA", "desc": "Conduct studies to advance medical science."},
    "Healthcare Consultant": {"salary": "₹7-20 LPA", "desc": "Advise hospitals and clinics on improving care and efficiency."},
    "Corporate Lawyer": {"salary": "₹10-40 LPA", "desc": "Handle business legal issues, contracts, and compliance."},
    "Legal Advisor": {"salary": "₹6-25 LPA", "desc": "Provide expert legal guidance to organizations."},
    "Policy Analyst": {"salary": "₹5-20 LPA", "desc": "Research and recommend public policy solutions."},
    "Civil Engineer": {"salary": "₹5-15 LPA", "desc": "Design and oversee construction projects."},
    "Mechanical Engineer": {"salary": "₹4-14 LPA", "desc": "Develop mechanical devices and systems."},
    "Electrical Engineer": {"salary": "₹5-16 LPA", "desc": "Design electrical systems and components."},
    "Graphic Designer": {"salary": "₹3-12 LPA", "desc": "Create visual concepts for branding and advertising."},
    "Content Writer": {"salary": "₹2-8 LPA", "desc": "Write and edit content for various media."},
    "Social Media Manager": {"salary": "₹4-12 LPA", "desc": "Manage social media strategies and campaigns."},
    "Data Analyst": {"salary": "₹4-15 LPA", "desc": "Interpret data and provide actionable insights."},
    "Pharmacist": {"salary": "₹3-10 LPA", "desc": "Dispense medication and advise on drug use."},
    "Teacher": {"salary": "₹3-12 LPA", "desc": "Educate students and manage classrooms."},
    "Architect": {"salary": "₹5-18 LPA", "desc": "Design buildings and urban spaces."},
    "Accountant": {"salary": "₹3-14 LPA", "desc": "Manage financial records and audits."},
    "Chef": {"salary": "₹2-10 LPA", "desc": "Prepare food and design menus."},
    "Event Manager": {"salary": "₹4-15 LPA", "desc": "Plan and coordinate events and functions."},
    "Environmental Scientist": {"salary": "₹5-18 LPA", "desc": "Study environmental impact and sustainability."},
    "Journalist": {"salary": "₹3-12 LPA", "desc": "Report news and conduct interviews."},
    "Psychologist": {"salary": "₹5-20 LPA", "desc": "Study mental processes and provide counseling."},
    "Biotechnologist": {"salary": "₹6-22 LPA", "desc": "Apply biology and tech in healthcare and agriculture."},
    "Pilot": {"salary": "₹12-50 LPA", "desc": "Fly commercial or cargo aircraft safely."},
    "UX/UI Designer": {"salary": "₹6-20 LPA", "desc": "Design user interfaces and experiences for apps."},
}

# Fill up to 200 jobs by duplicating with unique names
base_jobs = list(job_data.items())
while len(job_data) < 200:
    for k, v in base_jobs:
        if len(job_data) >= 200:
            break
        new_key = k + " Specialist " + str(len(job_data))
        job_data[new_key] = copy.deepcopy(v)

# ---------------------------- Helpers -------------------------------

def generate_pdf_report(name, profile, suggested_jobs):
    pdf = FPDF()
    pdf.add_page()
    pdf.set_font("Arial", "B", 16)
    pdf.cell(0, 12, f"Jobzilla Career Report for {name}", ln=True, align="C")
    pdf.ln(10)
    
    pdf.set_font("Arial", "", 12)
    pdf.cell(0, 10, "Profile Summary:", ln=True)
    for key, val in profile.items():
        pdf.cell(0, 8, f"{key}: {val}", ln=True)
    pdf.ln(8)

    pdf.cell(0, 10, "Suggested Jobs:", ln=True)
    for job in suggested_jobs:
        salary = job_data[job]["salary"]
        desc = job_data[job]["desc"]
        pdf.multi_cell(0, 8, f"- {job} ({salary}): {desc}")
        pdf.ln(2)

    return pdf.output(dest='S').encode('latin-1')


def get_salary_min_max(salary_str):
    try:
        parts = salary_str.replace('₹','').replace(' LPA','').split('-')
        return int(parts[0]), int(parts[1])
    except:
        return 0, 0

def filter_jobs_by_salary(min_salary, max_salary):
    results = []
    for job, info in job_data.items():
        low, high = get_salary_min_max(info["salary"])
        if low >= min_salary and high <= max_salary:
            results.append(job)
    return results

# ---------------------------- Streamlit App ----------------------------

st.set_page_config(page_title="Jobzilla AI - Career Companion", layout="wide")

st.title("🦖 Jobzilla AI — Your Career Companion")

# Profile input section
with st.expander("👤 Fill Your Profile", expanded=True):
    col1, col2, col3 = st.columns([2,2,2])
    with col1:
        user_name = st.text_input("Your Name")
        grade = st.selectbox("Current Level", ["9", "10", "11", "12", "Undergraduate", "Postgraduate", "Professional"])
        dream_job = st.text_input("Dream Job (optional)")
    with col2:
        fav_subjects = st.multiselect("Favorite Subjects", ["Math", "Biology", "Art", "Economics", "Physics", "History", "English", "Psychology", "Computer Science", "Commerce"])
        skills = st.text_area("Skills (comma separated)")
    with col3:
        location_pref = st.text_input("Preferred Job Location (optional)")
        st.markdown("### Salary Filter (₹ LPA)")
        min_salary = st.slider("Minimum Salary", 0, 50, 0, step=1)
        max_salary = st.slider("Maximum Salary", 0, 50, 50, step=1)

    st.markdown("---")

    show_suggestions = st.button("Show Job Suggestions")

# Store profile data for PDF and display
user_profile = {
    "Name": user_name or "N/A",
    "Current Level": grade,
    "Favorite Subjects": ", ".join(fav_subjects) if fav_subjects else "N/A",
    "Skills": skills or "N/A",
    "Dream Job": dream_job or "N/A",
    "Preferred Location": location_pref or "N/A",
    "Salary Filter": f"₹{min_salary} LPA to ₹{max_salary} LPA"
}

# Tabs for Suggestions and AI Chatbot
tab1, tab2 = st.tabs(["Career Suggestions", "Ask Jobzilla AI"])

with tab1:
    st.header("🦖 Career Suggestions")

    if show_suggestions:
        filtered_jobs = filter_jobs_by_salary(min_salary, max_salary)

        # Include dream job forcibly if exists
        if dream_job and dream_job in job_data:
            if dream_job not in filtered_jobs:
                filtered_jobs.insert(0, dream_job)

        if not filtered_jobs:
            st.warning("No jobs found matching your salary criteria.")
        else:
            for job in filtered_jobs[:50]:
                info = job_data[job]
                st.subheader(f"{job}")
                st.markdown(f"**Salary:** {info['salary']}")
                st.write(info['desc'])
                st.markdown("---")

            # Salary chart for top 20 jobs
            chart_df = pd.DataFrame({
                "Job": filtered_jobs[:20],
                "Min Salary (LPA)": [get_salary_min_max(job_data[j]["salary"])[0] for j in filtered_jobs[:20]],
                "Max Salary (LPA)": [get_salary_min_max(job_data[j]["salary"])[1] for j in filtered_jobs[:20]],
            }).set_index("Job")

            st.bar_chart(chart_df)

            # Resume tip
            skill_list = [s.strip() for s in skills.split(",") if s.strip()]
            resume_example = f"- Applied {skill_list[0] if skill_list else 'relevant'} skills to excel in {filtered_jobs[0]}"
            st.markdown("### Resume Tip")
            st.code(resume_example)

            # Career location advice
            location_text = location_pref or "India"
            st.markdown(f"### Career Location Advice")
            st.write(f"Jobs in **{location_text}** are growing in sectors like **{filtered_jobs[0]}** and many others. Keep an eye on local job market trends!")

            # PDF download link
            pdf_bytes = generate_pdf_report(user_name or "Student", user_profile, filtered_jobs[:10])
            b64_pdf = base64.b64encode(pdf_bytes).decode()
            href = f'<a href="data:application/octet-stream;base64,{b64_pdf}" download="jobzilla_report.pdf">📄 Download your Career Report (PDF)</a>'
            st.markdown(href, unsafe_allow_html=True)
    else:
        st.info("Fill your profile above and click **Show Job Suggestions** to get personalized career options!")

with tab2:
    st.header("🤖 Ask Jobzilla AI - Your Career Advisor")

    if 'ai_question' not in st.session_state:
        st.session_state['ai_question'] = ""
    if 'ai_response' not in st.session_state:
        st.session_state['ai_response'] = ""

    question = st.text_input("Enter your career question here:", value=st.session_state.ai_question)

    if st.button("Ask Jobzilla"):
        if question.strip() == "":
            st.warning("Please type a question to ask Jobzilla.")
        else:
            st.session_state.ai_question = question
            try:
                with st.spinner("Jobzilla is thinking..."):
                    response = openai.ChatCompletion.create(
                        model="gpt-4",
                        messages=[
                            {"role": "system", "content": "You are Jobzilla, a friendly career advisor for students in India."},
                            {"role": "user", "content": question},
                        ],
                        max_tokens=400,
                        temperature=0.7,
                    )
                    st.session_state.ai_response = response['choices'][0]['message']['content']
            except Exception as e:
                st.session_state.ai_response = f"OpenAI API Error: {e}"

    if st.session_state.ai_response:
        st.markdown("**Jobzilla says:**")
        st.write(st.session_state.ai_response)

st.markdown("---")
st.markdown("Made with ❤️ by Jobzilla AI | Powered by OpenAI and Streamlit")
