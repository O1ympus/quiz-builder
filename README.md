# Quiz Builder

A full-stack web application for creating and managing quizzes with multiple question types (Boolean, Input, and Checkbox).

## Tech Stack

**Frontend:** Next.js, TypeScript, React Hook Form, Axios  
**Backend:** Express.js, TypeScript, Sequelize, SQLite, CORS

## Prerequisites

- Node.js (v14 or higher)
- npm

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/O1ympus/quiz-builder.git
cd quiz-builder
```

### 2. Backend Setup

```bash
cd backend
npm install
```


Start the backend: 

```bash
npm start
```

The server will run on http://localhost:5001

### 3. Frontend Setup

Open a new terminal window:

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_BACKEND_URL=http://localhost:5001
```

Start the frontend:

```bash
npm run dev
```

The application will run on http://localhost:3000

## Creating a Sample Quiz

1. Navigate to http://localhost:3000/create
2. Enter a quiz title
3. Add questions using the form:
   - **Boolean:** Type `BOOLEAN`, enter question text, leave options empty
   - **Input:** Type `INPUT`, enter question text, leave options empty
   - **Checkbox:** Type `CHECKBOX`, enter question text, add comma-separated options (e.g., "Option1, Option2, Option3")
4. Click "Add Question" to add more questions
5. Click "Create Quiz" to save
6. View your quizzes at http://localhost:3000/quizzes

## API Endpoints

Base URL: http://localhost:5001

- `GET /quizzes` - Get all quizzes
- `GET /quizzes/:id` - Get a specific quiz
- `POST /quizzes` - Create a new quiz
- `DELETE /quizzes/:id` - Delete a quiz

## Project Structure

```
quiz-builder/
├── backend/
│   ├── config/config.json
│   ├── src/
│   │   ├── models/
│   │   │   ├── index.ts
│   │   │   ├── quiz.ts
│   │   │   └── question.ts
│   │   └── index.ts
│   └── database. sqlite
├── frontend/
│   ├── pages/
│   │   ├── create.tsx
│   │   └── quizzes/
│   │       ├── index.tsx
│   │       └── [id].tsx
│   └── . env.local
└── README. md
```
