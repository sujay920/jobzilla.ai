import streamlit as st
import pandas as pd
import time
import openai
from fpdf import FPDF
import base64

# ---------------------- OpenAI API Key ----------------------
openai.api_key = st.secrets.get("OPENAI_API_KEY") or "your-api-key-here"

# ---------------------- Large Job Data & Salaries ----------------------

# Example data - 200+ jobs with rough salary ranges (LPA = Lakhs per annum)
job_data = {
    "Software Engineer": ("₹6-35 LPA", "Develop software applications."),
    "Data Scientist": ("₹8-40 LPA", "Analyze data to derive business insights."),
    "AI Engineer": ("₹10-45 LPA", "Build AI models and algorithms."),
    "Product Manager": ("₹12-40 LPA", "Lead product development cycles."),
    "Digital Marketing Manager": ("₹5-25 LPA", "Plan and execute marketing campaigns."),
    "Graphic Designer": ("₹3-12 LPA", "Create visual content for branding."),
    "Civil Engineer": ("₹4-18 LPA", "Design and oversee construction projects."),
    "Mechanical Engineer": ("₹5-20 LPA", "Develop mechanical systems and devices."),
    "Electrical Engineer": ("₹5-22 LPA", "Work on electrical systems and circuits."),
    "Doctor": ("₹8-50 LPA", "Diagnose and treat patients."),
    "Nurse": ("₹3-12 LPA", "Provide patient care and support."),
    "Pharmacist": ("₹3-15 LPA", "Dispense medications and counsel patients."),
    "Lawyer": ("₹6-40 LPA", "Advise and represent clients legally."),
    "Chartered Accountant": ("₹7-35 LPA", "Handle auditing and finance."),
    "Teacher": ("₹3-15 LPA", "Educate students in various subjects."),
    "Research Scientist": ("₹6-25 LPA", "Conduct scientific studies."),
    "UX Designer": ("₹6-20 LPA", "Design user-friendly interfaces."),
    "HR Specialist": ("₹4-16 LPA", "Manage recruitment and employee relations."),
    "Business Analyst": ("₹6-22 LPA", "Analyze business needs and solutions."),
    "Financial Analyst": ("₹7-25 LPA", "Evaluate financial data and trends."),
    "Journalist": ("₹3-18 LPA", "Report news and create stories."),
    "Chef": ("₹3-15 LPA", "Prepare and design menus."),
    "Pilot": ("₹15-80 LPA", "Fly commercial or private aircraft."),
    "Architect": ("₹5-22 LPA", "Design buildings and structures."),
    # ... (expand this list to 200+ jobs similarly) ...
}

# For demonstration, I'll create a large dummy list by repeating/modifying these:
base_jobs = list(job_data.items())

# Expand to 200+ by tweaking job titles slightly
expanded_jobs = {}
for i in range(1, 11):
    for title, (salary, desc) in base_jobs:
        new_title = f"{title} {i}" if i > 1 else title
        # Slightly modify salary ranges to simulate different roles
        salary_range = salary.replace("₹", "").replace(" LPA", "")
        min_salary, max_salary = salary_range.split("-")
        min_salary_num = int(min_salary) + i  # increment min salary
        max_salary_num = int(max_salary) + i * 2  # increment max salary
        new_salary = f"₹{min_salary_num}-{max_salary_num} LPA"
        expanded_jobs[new_title] = (new_salary, desc)

# Convert dict to lists for selectbox display
all_jobs = list(expanded_jobs.keys())

# ---------------------- Streamlit UI ----------------------

st.set_page_config(page_title="Jobzilla AI - Career Advisor", layout="wide")
st.title("🦖 Jobzilla AI – Your Career Companion")

# Sidebar inputs
with st.sidebar:
    st.header("Customize Your Profile")
    user_name = st.text_input("Your Name")
    grade = st.selectbox("Current Level", ["9", "10", "11", "12", "Undergraduate", "Postgraduate"])
    fav_subjects = st.multiselect("Favorite Subjects", ["Math", "Biology", "Art", "Economics", "Physics", "History", "English", "Psychology", "Computer Science"])
    skills = st.text_area("Skills (comma-separated)")
    dream_job = st.text_input("Dream Job (optional)")
    location_pref = st.text_input("Preferred Job Location")

    st.markdown("---")
    st.header("Find Your Job")
    selected_job = st.selectbox("Select a Job to Explore", all_jobs)
    start = st.button("Show Suggestions")

# Main layout with two columns for better spacing
left_col, right_col = st.columns([3, 2])

if start:
    with left_col:
        st.subheader(f"Career Suggestions for {user_name or 'Friend'}")

        # Job info
        salary_range, description = expanded_jobs[selected_job]
        st.markdown(f"### {selected_job}")
        st.write(description)
        st.write(f"💰 **Salary Range:** {salary_range}")

        # Resume Tip
        skill_keywords = [s.strip() for s in skills.split(",") if s.strip()]
        if skill_keywords:
            resume_example = f"- Utilized {skill_keywords[0]} skills in {fav_subjects[0] if fav_subjects else 'relevant'} subjects to pursue opportunities as a {selected_job}."
        else:
            resume_example = f"- Focused on relevant skills and subjects to pursue opportunities as a {selected_job}."
        st.subheader("Resume Tip")
        st.code(resume_example)

        # Location Advice
        st.subheader("Career Location Advice")
        st.markdown(f"Jobs in **{location_pref or 'India'}** in the role of **{selected_job}** are growing. Consider local industry trends and growth areas.")

        # PDF export
        st.subheader("Download Your Career Report")
        pdf = FPDF()
        pdf.add_page()
        pdf.set_font("Arial", size=14)
        pdf.cell(0, 10, txt=f"Jobzilla Career Report for {user_name or 'Student'}", ln=True, align="C")
        pdf.ln(10)
        pdf.set_font("Arial", size=12)
        pdf.cell(0, 10, txt=f"Selected Job: {selected_job}", ln=True)
        pdf.cell(0, 10, txt=f"Salary Range: {salary_range}", ln=True)
        pdf.multi_cell(0, 10, txt=f"Job Description: {description}")
        pdf.ln(10)
        pdf.cell(0, 10, txt="Resume Tip:", ln=True)
        pdf.multi_cell(0, 10, txt=resume_example)
        pdf.ln(10)
        pdf.cell(0, 10, txt=f"Location Advice: Jobs in {location_pref or 'India'} in this role are promising.", ln=True)

        pdf_output = f"{user_name or 'Jobzilla'}_Career_Report.pdf"
        pdf.output(pdf_output)

        with open(pdf_output, "rb") as f:
            b64 = base64.b64encode(f.read()).decode()
            href = f'<a href="data:application/pdf;base64,{b64}" download="{pdf_output}">📄 Download PDF Report</a>'
            st.markdown(href, unsafe_allow_html=True)

    with right_col:
        st.subheader("Ask Jobzilla Anything!")
        if "response" not in st.session_state:
            st.session_state.response = ""

        user_question = st.text_input("Enter your career question:")

        if st.button("Ask Jobzilla"):
            if user_question.strip():
                try:
                    with st.spinner("Getting answer from Jobzilla..."):
                        response = openai.ChatCompletion.create(
                            model="gpt-4",
                            messages=[
                                {"role": "system", "content": "You are Jobzilla, a friendly career advisor for students in India."},
                                {"role": "user", "content": user_question}
                            ]
                        )
                        st.session_state.response = response["choices"][0]["message"]["content"]
                except Exception as e:
                    st.session_state.response = f"OpenAI API Error: {str(e)}"
            else:
                st.session_state.response = "Please enter a question."

        if st.session_state.response:
            st.markdown("**Jobzilla says:**")
            st.write(st.session_state.response)

else:
    st.info("Fill in your profile and select a job, then click 'Show Suggestions' to get started!")

