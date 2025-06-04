import streamlit as st
import openai
from fpdf import FPDF
import base64

# OpenAI API key (replace with your own or use secrets management)
openai.api_key = st.secrets.get("OPENAI_API_KEY") or "your-api-key-here"

# Job data with salary as string, using Rs. instead of ₹ to avoid unicode issue in PDF
job_data = {
    "Software Engineer": ("Rs.6-35 LPA", "Develop software applications."),
    "Data Scientist": ("Rs.8-40 LPA", "Analyze data to derive business insights."),
    "AI Engineer": ("Rs.10-45 LPA", "Build AI models and algorithms."),
    "Product Manager": ("Rs.12-40 LPA", "Lead product development cycles."),
    "Digital Marketing Manager": ("Rs.5-25 LPA", "Plan and execute marketing campaigns."),
    "Graphic Designer": ("Rs.3-12 LPA", "Create visual content for branding."),
    "Civil Engineer": ("Rs.4-18 LPA", "Design and oversee construction projects."),
    "Mechanical Engineer": ("Rs.5-20 LPA", "Develop mechanical systems and devices."),
    "Electrical Engineer": ("Rs.5-22 LPA", "Work on electrical systems and circuits."),
    "Doctor": ("Rs.8-50 LPA", "Diagnose and treat patients."),
    "Nurse": ("Rs.3-12 LPA", "Provide patient care and support."),
    "Pharmacist": ("Rs.3-15 LPA", "Dispense medications and counsel patients."),
    "Lawyer": ("Rs.6-40 LPA", "Advise and represent clients legally."),
    "Chartered Accountant": ("Rs.7-35 LPA", "Handle auditing and finance."),
    "Teacher": ("Rs.3-15 LPA", "Educate students in various subjects."),
    "Research Scientist": ("Rs.6-25 LPA", "Conduct scientific studies."),
    "UX Designer": ("Rs.6-20 LPA", "Design user-friendly interfaces."),
    "HR Specialist": ("Rs.4-16 LPA", "Manage recruitment and employee relations."),
    "Business Analyst": ("Rs.6-22 LPA", "Analyze business needs and solutions."),
    "Financial Analyst": ("Rs.7-25 LPA", "Evaluate financial data and trends."),
    "Journalist": ("Rs.3-18 LPA", "Report news and create stories."),
    "Chef": ("Rs.3-15 LPA", "Prepare and design menus."),
    "Pilot": ("Rs.15-80 LPA", "Fly commercial or private aircraft."),
    "Architect": ("Rs.5-22 LPA", "Design buildings and structures."),
}

# Expanding job list by adding numeric suffixes (for demo)
expanded_jobs = {}
for i in range(1, 11):
    for title, (salary, desc) in job_data.items():
        new_title = f"{title} {i}" if i > 1 else title
        expanded_jobs[new_title] = (salary, desc)

all_jobs = list(expanded_jobs.keys())

st.set_page_config(page_title="Jobzilla AI", layout="wide")
st.title("🦖 Jobzilla AI – Your Career Companion")

# Sidebar for profile info
with st.sidebar:
    st.header("Your Profile")
    user_name = st.text_input("Your Name", key="user_name")
    grade = st.selectbox("Current Level", ["9", "10", "11", "12", "Undergraduate", "Postgraduate"], key="grade")
    fav_subjects = st.multiselect("Favorite Subjects", ["Math", "Biology", "Art", "Economics", "Physics", "History", "English", "Psychology", "Computer Science"], key="fav_subjects")
    skills = st.text_area("Skills (comma-separated)", key="skills")
    dream_job = st.text_input("Dream Job (optional)", key="dream_job")
    location_pref = st.text_input("Preferred Job Location", key="location_pref")

    st.markdown("---")
    st.header("Find Your Job")
    selected_job = st.selectbox("Select a Job to Explore", all_jobs, key="selected_job")
    start = st.button("Show Suggestions")

# Initialize session state variables for AI Q&A
if "ai_question" not in st.session_state:
    st.session_state.ai_question = ""
if "ai_response" not in st.session_state:
    st.session_state.ai_response = ""

# Layout columns
left_col, right_col = st.columns([3, 2])

if start:
    with left_col:
        st.subheader(f"Career Suggestions for {user_name or 'Friend'}")
        salary_range, description = expanded_jobs[selected_job]

        st.markdown(f"### {selected_job}")
        st.write(description)
        st.write(f"💰 **Salary Range:** {salary_range}")

        skill_keywords = [s.strip() for s in skills.split(",") if s.strip()]
        if skill_keywords:
            resume_example = f"- Utilized {skill_keywords[0]} skills in {fav_subjects[0] if fav_subjects else 'relevant'} subjects to pursue opportunities as a {selected_job}."
        else:
            resume_example = f"- Focused on relevant skills and subjects to pursue opportunities as a {selected_job}."

        st.subheader("Resume Tip")
        st.code(resume_example)

        st.subheader("Career Location Advice")
        st.markdown(f"Jobs in **{location_pref or 'India'}** for the role **{selected_job}** are growing. Consider local industry trends and growth areas.")

        # Create PDF with replaced Rs. to avoid unicode errors
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
        # Use key so question input remembers value in session_state
        user_question = st.text_input("Enter your career question:", value=st.session_state.ai_question, key="ai_question")

        if st.button("Ask Jobzilla"):
            if user_question.strip():
                st.session_state.ai_question = user_question  # Save question in session state
                try:
                    with st.spinner("Getting answer from Jobzilla..."):
                        response = openai.ChatCompletion.create(
                            model="gpt-4",
                            messages=[
                                {"role": "system", "content": "You are Jobzilla, a friendly career advisor for students in India."},
                                {"role": "user", "content": user_question}
                            ],
                            max_tokens=300,
                            temperature=0.7,
                        )
                        st.session_state.ai_response = response["choices"][0]["message"]["content"]
                except Exception as e:
                    st.session_state.ai_response = f"OpenAI API Error: {str(e)}"
            else:
                st.session_state.ai_response = "Please enter a question."

        if st.session_state.ai_response:
            st.markdown("**Jobzilla says:**")
            st.write(st.session_state.ai_response)

else:
    st.info("Fill in your profile, select a job, and click 'Show Suggestions' to get started!")
