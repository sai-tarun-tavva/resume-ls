# 🧠 Recruit Smarter: Comprehensive Talent Management Solution

> **Note:** Formerly known as RSuite (Resume Suite)

Transforms your hiring process with our AI-powered suite. Seamlessly manages candidates, automates interviews, and makes data-driven decisions. Built for Logisoft, **R**ecruit**S**marter aims to improve efficiency in managing resumes, onboarding new candidates, conducting automated interviews, enhancing resume quality to improve ATS scores, bridging sales and recruitment, and analyzing website content.

This documentation provides an overview of the features in RGlint, RHatch, RSpark, RQuest, RForge, and RNexus – the core tools of this application.

- 🔍 **RGlint** (formerly RGlint): Smart resume parsing and candidate management.
- 📋 **RHatch** (formerly RHatch): Efficient candidate onboarding system.
- ⚡ **RSpark**: AI-powered resume optimization.
- 🎯 **RQuest**: Automated interview system with AI-generated questions.
- ⚙️ **RForge**: Dual-purpose platform for recruiting and sales collaboration.
- 🔗 **RNexus**: Website analysis and content extraction tool.

### Backend and Data Processing

> **Note:** This project focuses primarily on the user interface (UI) of **R**ecruit**S**marter, but the frontend interacts with various backend services via API calls to manage and process data.

#### API Interactions

This application communicates with backend services through a set of API calls to handle various operations such as:

- **Candidate Data Management**: The UI interfaces with the backend to retrieve, update, and manage candidate data, including their personal information, employment history, and educational background.
- **AI Services**: **R**ecruit**S**marter integrates with AI-powered services like **OpenAI**, **GeminiAI** and **LLama** to provide features like resume analysis, suggestions for resume improvement, keyword matching, and interview question generation.
- **Website Analysis**: Backend services handle website scraping and content analysis for RNexus functionality.
- **Form Processing**: Manages form submissions and data processing for both recruiting and sales operations in RForge.

The frontend sends requests to the backend, which processes and returns the relevant data to be displayed on the UI. While this project doesn't include the backend implementation, it relies heavily on external services (e.g., OpenAI for resume analysis and interview questions) to enrich the user experience.

## 🚀 Key Features

- **Secure Authentication**: Protect your data with robust user authentication.
- **Responsive Design**: Enjoy a seamless experience across all devices, from desktops to mobile phones, ensuring that you can manage candidates anytime, anywhere.

### RGlint

- **Comprehensive Candidate Overview**: Get a quick snapshot of all candidates at a glance.
- **Effortless Resume Upload**: Simplify the process of adding new candidates to your system.
- **Intuitive Editing**: Update candidate profiles with ease through our user-friendly interface.
- **Advanced Search**: Quickly find the right candidates using our powerful search functionality.

### RHatch

- **Interactive Candidate Management**: View and manage candidates through an intuitive interface.
- **Streamlined Onboarding**: Add and onboard new candidates with comprehensive detail capture.
- **Dual View Modes**: Toggle between view and edit modes for efficient data management.
- **Smart Search**: Find candidates based on status, firstname, lastname, email, and phone.

### RSpark

- **AI-Powered Analysis**: Leverage multiple AI services. (OpenAI, Gemini AI, and future integrations)
- **Comprehensive Resume Enhancement**: Choose from various analysis options:
  - Overall Assessment
  - About Resume
  - Percentage Match
  - Improve Resume
  - Missing Keywords
  - Interview Questions
  - Domain Experience
  - Desired Skills
  - Hashtags
- **Real-time Results**: View AI suggestions and improvements instantly on the right panel.

### RQuest

- **AI-Powered Question Generation**: Generate relevant interview questions based on job descriptions.
- **Automated Phone Interviews**: Conduct automated phone interviews with candidates.
- **Real-time Conversation Display**: Monitor interview progress and responses in real-time.
- **Call Management**: Track call duration and status during interviews.
- **Conversation History**: Review complete interview transcripts and AI-candidate interactions.

### RForge

- **Role-Based Views**:
  - Recruiter View: Access recruiting-specific forms and submissions
  - Sales View: Access sales-specific forms and submissions
  - Manager View: Comprehensive access to both recruiting and sales data
- **Form-Based Data Entry**:
  - Sales Form: Capture client requirements and candidate marketing details
  - Recruiting Form: Manage candidate acquisition and job requirement details
- **Interactive Data Tables**: View and manage submissions with sorting and filtering capabilities
- **Dashboard Analysis** (Upcoming):
  - Visual analytics for recruiter and sales activities
  - Performance metrics and submission tracking

### RNexus

- **URL Analysis**: Input and analyze website URLs for content extraction
- **Real-Time Scraping**: Quick website content retrieval and processing
- **Markdown Display**: Clean, formatted presentation of website overviews

## 🛠️ Technology Stack

- **JavaScript**: The primary programming language used for development.
- **React**: A JavaScript component-based library for dynamic UI development.
- **HTML5**: The latest version of the Hypertext Markup Language for structuring content.
- **CSS3/SCSS**: Styling framework for responsive and customizable design.

## 📚 Libraries and Frameworks

- **React Router**: Enabling smooth navigation throughout the application.
- **Redux**: Managing global state efficiently for a cohesive user experience.
- **SCSS**: Providing stylish and maintainable component styling.
- **Bootstrap Icons**: Enhancing the UI with a comprehensive icon set.
- **Fetch API**: Built-in web API for making HTTP requests to interact with the backend.
- **React Markdown**: Rendering markdown content for AI responses.
- **Remark-GFM**: Supporting GitHub Flavored Markdown in AI suggestions.

## 📋 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v14.0.0 or higher (v16+ recommended)
- **npm**: v6.0.0 or higher (or Yarn v1.22.0+)

### Setup Instructions

1. **Clone the repository**:

   ```
   git clone https://github.com/sai-tarun-tavva/resume-ls.git
   cd resume-ls
   ```

2. **Install dependencies**:

   ```
   npm install
   ```

3. **Start the development server**:

   ```
   npm start
   ```

4. **Access the application**: Open your browser and navigate to `http://localhost:3000`

## 💡 How to Use

- **Log In**: Access the system using your company credentials.

### RGlint

1. **View Candidates**: Explore the list of candidates on the homepage
2. **Upload Resumes**: Add new candidates by uploading their resumes
3. **Edit Information**: Update and refine candidate details as needed
4. **Search**: Utilize the search function to find specific candidates or skills

### RHatch

1. **Access Dashboard**: Navigate to the onboarding section.
2. **View Candidates**: Explore the list of candidates in the interactive table.
3. **Add or Onboard Candidates**: Add new candidates by providing their details.
4. **Edit Mode**: Toggle between view and edit modes.
5. **Search Capabilities**: Find candidates based on status, name, and contact information.

### RSpark

1. **Input Information**: Provide job description and resume.
2. **Select AI Service**: Choose between OpenAI, Gemini AI, or other available services.
3. **Choose Actions**: Select from various analysis options.
4. **View Results**: See AI-generated suggestions and improvements in the right panel.

### RQuest

1. **Enter Job Description**: Input the job description to generate relevant interview questions.
2. **Review Questions**: View and verify AI-generated interview questions.
3. **Initiate Interview**: Enter candidate's phone number and start the automated interview.
4. **Monitor Progress**: Track the interview in real-time through the conversation display.
5. **Review Results**: Access complete interview transcripts and AI-candidate interactions.

### RForge

1. **Select Role View**: Choose between recruiter, sales, or manager interface
2. **Form Submission**: 
   - Fill out role-specific forms for candidate or sales data
   - Submit and track entries through interactive tables
3. **Data Management**: Filter submissions based on key fields
4. **Dashboard Analysis**: Access performance metrics and submission analytics (upcoming)

### RNexus

1. **Enter URL**: Input the target website URL in the provided field
2. **Initiate Analysis**: Click "Scrape" to begin website content extraction
3. **View Results**: Review the formatted website overview in the display area

## 🤝 Contributing

This project is for internal use at Logisoft. If you're part of the team and want to contribute, please reach out to the project lead for guidance.

## 📄 License

This project is proprietary and intended for internal Logisoft use only.

## 📈 Version History

### 🔍 1.0.0 - RGlint Launch
- **RGlint**: Initial version containing the RGlint tool, which includes features for resume parsing, candidate management, and resume analysis.

### 📋 ⚡ 2.0.0 - Enhanced Talent Management
- **RHatch**: Added the RHatch tool for efficient candidate onboarding, including features for managing candidate profiles and onboarding status.
- **RSpark**: Introduced RSpark, an AI-powered resume optimization tool for enhancing resumes and improving ATS scores.

### 🎯 3.0.0 - Automated Interviews
- **RQuest**: Added RQuest, an automated interview system featuring AI-generated questions and phone interview capabilities.

### ⚙️ 4.0.0 - Sales and Recruit Integration
- **RForge**: Added RForge tool for bridging recruiting and sales operations
- Enhanced collaboration between recruitment and sales teams
- Role-based access control and form management

### 🔗 5.0.0 - Website Intelligence
- **RNexus**: Introduced website analysis capabilities
- Real-time content extraction and overview generation


## 📞 Support

If you have any questions or run into issues, don't hesitate to contact the development team. We're here to help ensure your experience with **R**ecruit**S**marter is smooth and productive.

---

Thank you for using **R**ecruit**S**marter. Together, let's elevate the talent management experience! ✨✨✨
