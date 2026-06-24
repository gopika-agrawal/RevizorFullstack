## 🚀 Revizor – AI Powered PYQ Analysis Platform

Revizor is an AI-powered exam preparation platform that analyzes Previous Year Question Papers (PYQs) and automatically generates unit-wise insights, frequency analysis, and exam-oriented answer PDFs. It helps students identify high-priority topics and focus their preparation on the most frequently asked concepts.

## 🌟 Features

### 📄 PDF Upload & Processing

* Upload multiple Previous Year Question Papers (PDFs)
* Automatic text extraction using Apache PDFBox
* Question extraction and storage in PostgreSQL

### 🤖 AI-Powered Analysis

* Unit-wise question distribution analysis
* Frequency analysis of repeated questions
* Identification of high-priority exam topics
* AI-generated insights using Groq LLM

### 📊 Interactive Dashboard

* Unit Weightage Visualization
* Frequency Analysis Dashboard
* Mobile Responsive Charts
* Exam Trend Analysis

### 📝 Answer PDF Generation

* Generates university-specific answer PDFs
* Covers important and frequently asked questions
* Exam-oriented structured content
* Downloadable PDF format

### 🔐 Authentication & Security

* JWT-based Authentication
* Protected APIs using Spring Security
* Secure password validation
* Role-based endpoint protection

---

## 🛠️ Tech Stack

### Frontend

* React.js
* React Router
* Tailwind CSS
* Recharts
* React Toastify

### Backend

* Spring Boot
* Spring Security
* Spring Data JPA
* Hibernate
* JWT Authentication
* Apache PDFBox

### Database

* PostgreSQL
* Neon Database

### AI Integration

* Groq API
* Llama 3.3 70B Versatile Model

### Deployment

* Frontend: Vercel
* Backend: Railway
* Database: Neon

---

## 🏗️ System Architecture

```text
User
 │
 ▼
React Frontend (Vercel)
 │
 ▼
Spring Boot Backend (Railway)
 │
 ├── PostgreSQL (Neon)
 │
 ├── Apache PDFBox
 │
 └── Groq AI (Llama 3.3)
```

---

## 📂 Project Structure

```text
Revizor-Fullstack
│
├── frontend
│   ├── src
│   ├── components
│   ├── pages
│   ├── charts
│   └── services
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   ├── entity
│   ├── config
│   └── security
│
└── README.md
```

---

## ⚙️ Environment Variables

### Backend (.env / Railway Variables)

```env
SPRING_DATASOURCE_URL=
SPRING_DATASOURCE_USERNAME=
SPRING_DATASOURCE_PASSWORD=

GROQ_API_KEY=

JWT_SECRET=
JWT_EXPIRATION=
```

---

## 🚀 Local Setup

### Clone Repository

```bash
git clone https://github.com/gopika-agrawal/RevizorFullstack

cd Revizor-Fullstack
```

### Backend Setup

```bash
cd backend

mvn clean install

mvn spring-boot:run
```

Backend runs on:

```text
http://localhost:8080/api
```

### Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

Frontend runs on:

```text
http://localhost:5173
```

---

## 📈 Key Functionalities

### User Workflow

1. Register/Login
2. Upload PYQ PDFs
3. Extract Questions
4. Generate AI Insights
5. View Unit Analysis
6. View Frequency Analysis
7. Download Answer PDF

---

## 📊 Sample Insights Generated

### Unit Analysis

* Unit-wise question distribution
* Important units identification
* Topic coverage analysis

### Frequency Analysis

* Repeated questions detection
* Frequency ranking
* Importance categorization

  * HIGH
  * MEDIUM
  * LOW

---

## 🔒 Security Features

* JWT Authentication
* Spring Security Filters
* Protected REST APIs
* CORS Configuration
* Input Validation

---

## 📱 Responsive Design

* Desktop Optimized
* Tablet Optimized
* Mobile Responsive
* Interactive Charts

---

## 🎯 Future Enhancements

* Multi-University Support
* Subject Recommendation Engine
* AI Chat Assistant
* Personalized Study Planner
* Cloud Storage Integration
* Question Difficulty Prediction

---

## 👨‍💻 Author

**Gopika Agrawal**

B.Tech CSE | Java Full Stack Developer

* Java
* Spring Boot
* React.js
* PostgreSQL
* System Design
* Data Structures & Algorithms

---

## ⭐ If you found this project useful, consider giving it a star!! 
