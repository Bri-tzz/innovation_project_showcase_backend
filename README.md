#Innovation Project Showcase Portal

## Project Overview
A web-based platform for students to submit, showcase, and explore innovation projects within the institution. The portal features user authentication, project submission, project browsing with filters, detailed views with commenting, and an admin dashboard for managing submissions.

---

## Deployment Links
- *Frontend GitHub Repo*: [GitHub - Frontend](https://github.com/Bri-tzz/innovation_project_showcase_frontend)
- *Backend GitHub Repo*: [GitHub - Backend](https://github.com/Bri-tzz/innovation_project_showcase_backend)
- *Live Site*: [https://acity-project-portal.vercel.app/](https://acity-project-portal.vercel.app/)

---

## Login Details

### Admin
- *Email*: admin@example.com  
- *Password*: test

### Sample User
- *Email*: student@example.com  
- *Password*: password123

---

## Feature Checklist

| Feature                                         | Status |
|------------------------------------------------|--------|
| User signup/login                              | ✅     |
| Project submission (title, description, etc.)  | ✅     |
| Browse/filter projects (tags, year, category)  | ✅     |
| Project thumbnails and short overviews         | ✅     |
| Project detail page                            | ✅     |
| Comments/feedback by logged-in users           | ✅     |
| Admin approval/rejection of submissions        | ✅     |
| Admin can edit/remove inappropriate content    | ✅     |

---

## Installation Instructions

### 1. Clone the repositories
```bash
git clone https://github.com/Bri-tzz/innovation_project_showcase_frontend.git
git clone https://github.com/Bri-tzz/innovation_project_showcase_backend.git

2. Frontend Setup

cd innovation_project_showcase_frontend
npm install
npm start

3. Backend Setup

cd innovation_project_showcase_backend
npm install
npm run dev

4. Environment Variables

Create a .env file in the innovation_project_showcase_backend folder and add:

MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret



⸻

Technologies Used
	•	Frontend: React.js
	•	Backend: Node.js, Express.js, MongoDB
	•	Deployment: Vercel (frontend), Render (backend)
