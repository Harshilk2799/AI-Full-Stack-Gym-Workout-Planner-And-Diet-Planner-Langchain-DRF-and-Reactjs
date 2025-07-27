# 🔐 AI Gym Workout & Diet Planner

An AI-powered **Full Stack Web Application** that generates **personalized workout and diet plans** using **LangChain** and **Google Gemini** based on user inputs. 

---

## 🚀 Features

- ✍️ Input personal fitness information
- 🤖 Automatically generate customized **Workout & Diet Plans** using AI (LangChain + Gemini)
- 📝 View, update, or delete personal data
- 📊 Real-time plan updates on data change

---

## 🛠️ Tech Stack

### 🖥️ Frontend

- **ReactJS** – Dynamic UI rendering
- **Axios** – API integration
- **React Router DOM** – Frontend routing
- **Bootstrap** – Responsive and clean UI

### 🧠 Backend

- **Django** – Backend logic & ORM
- **Django REST Framework (DRF)** – API creation
- **Django CORS Headers** – Cross-origin support
- **LangChain** – AI framework for prompt chaining
- **Pydantic** – Request data validation
- **Google Gemini Model** – Generates AI-based plans

---

## 🔗 API Endpoints

### 👤 Personal Info

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/personal-info/` | Create personal info and auto-generate AI workout + diet plan |
| `GET`  | `/api/personal-info/` | Retrieve all stored personal info records |
| `PATCH`| `/api/personal-info/<int:personal_info_id>/` | Update info and regenerate AI-generated plan |
| `DELETE`| `/api/personal-info/<int:personal_info_id>/` | Delete a personal info record and its plans |

### 🏋️‍♂️ Workout + Diet Planner

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET`  | `/api/personal-info/<int:personal_info_id>/workout-planner/` | Fetch AI-generated workout & diet plan for a given user |

---

## 🧑‍💻 Setup Instructions

### ⚙️ Backend (Django)

```bash
# Step into the backend folder
cd backend

# Create virtual environment
python -m venv env
source env/bin/activate  # For Linux/macOS
# .\env\Scripts\activate  # For Windows

# Install dependencies
pip install -r requirements.txt

# Run database migrations
python manage.py migrate

# Start the development server
python manage.py runserver
