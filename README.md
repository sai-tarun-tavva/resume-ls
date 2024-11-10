# 🛠️ RSuite: Comprehensive Talent Management Solution

Welcome to the RSuite project – a robust suite of tools developed to streamline your hiring and onboarding workflows. Built for Logisoft, RSuite aims to improve efficiency in managing resumes, onboarding new candidates, and enhancing resume quality to improve ATS scores.

This documentation provides an overview of the features in RInsight, ROnboard, and RSpark – the core tools of RSuite.

- 🔍 **RInsight**: Smart resume parsing and candidate management.
- 📋 **ROnboard**: Efficient candidate onboarding system.
- ⚡ **RSpark**: AI-powered resume optimization.

### Backend and Data Processing

> **Note:** This project focuses primarily on the user interface (UI) of RSuite, but the frontend interacts with various backend services via API calls to manage and process data.

#### API Interactions

The RSuite application communicates with backend services through a set of API calls to handle various operations such as:

- **Candidate Data Management**: The UI interfaces with the backend to retrieve, update, and manage candidate data, including their personal information, employment history, and educational background.
- **AI Services**: RSuite integrates with AI-powered services like **OpenAI** (and potentially **Gemini AI** in the future) to provide features like resume analysis, suggestions for resume improvement, and keyword matching.

The frontend sends requests to the backend, which processes and returns the relevant data to be displayed on the UI. While this project doesn't include the backend implementation, it relies heavily on external services (e.g., OpenAI for resume analysis) to enrich the user experience.

## 🚀 Key Features

- **Secure Authentication**: Protect your data with robust user authentication.
- **Responsive Design**: Enjoy a seamless experience across all devices, from desktops to mobile phones, ensuring that you can manage candidates anytime, anywhere.

### RInsight

- **Comprehensive Candidate Overview**: Get a quick snapshot of all candidates at a glance.
- **Effortless Resume Upload**: Simplify the process of adding new candidates to your system.
- **Intuitive Editing**: Update candidate profiles with ease through our user-friendly interface.
- **Advanced Search**: Quickly find the right candidates using our powerful search functionality.

### ROnboard

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
   git clone http://gitlab.lstech-hq.lstechinc.com/products/resume-parser-react-fe.git
   cd resume-parser-react-fe
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

### RInsight

1. **View Candidates**: Explore the list of candidates on the homepage
2. **Upload Resumes**: Add new candidates by uploading their resumes
3. **Edit Information**: Update and refine candidate details as needed
4. **Search**: Utilize the search function to find specific candidates or skills

### ROnboard

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

## 🤝 Contributing

This project is for internal use at Logisoft. If you're part of the team and want to contribute, please reach out to the project lead for guidance.

## 📄 License

This project is proprietary and intended for internal Logisoft use only.

## Version History

### 1.0.0
- **RInsight**: Initial version containing the RInsight tool, which includes features for resume parsing, candidate management, and resume analysis.

### 2.0.0
- **ROnboard**: Added the ROnboard tool for efficient candidate onboarding, including features for managing candidate profiles and onboarding status.
- **RSpark**: Introduced RSpark, an AI-powered resume optimization tool for enhancing resumes and improving ATS scores.


## 📞 Support

If you have any questions or run into issues, don't hesitate to contact the development team. We're here to help ensure your experience with RSuite is smooth and productive.

---

Thank you for using RSuite. Together, let's elevate the talent management experience!
