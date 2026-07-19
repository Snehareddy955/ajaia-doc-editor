# Ajaia Docs - Document Editor

## Overview
Ajaia Docs is a web-based document editor application that allows users to create, edit, save, and manage documents online.

## Features
- Create and edit documents
- Rich text editor
- Bold, Italic, Underline formatting
- Headings support
- Bullet and numbered lists
- Document storage
- File import support
- REST API backend

## Tech Stack

Frontend:
- React.js
- Vite
- TipTap Editor
- Axios

Backend:
- Flask
- Flask-SQLAlchemy
- SQLite

Deployment:
- Backend: Render
- Frontend: Vercel

## Project Structure
ajaia-doc-editor
|
|-- backend
|-- frontend
|-- README.md
|-- ARCHITECTURE.md
|-- AI_WORKFLOW.md
|-- SUBMISSION.md
## Run Backend
cd backend
pip install -r requirements.txt
python app.py
## Run Frontend


cd frontend
npm install
npm run dev


## Testing

Run:


pytest


Result:

2 tests passed

## Deployment

Backend:
https://ajaia-docs-backend-zbin.onrender.com

Frontend:
(Add Vercel URL)

## Author

Sneha Reddy
2) ARCHITECTURE.md
# Ajaia Docs Architecture

## Architecture Flow

User

↓

React Frontend

↓

Axios API

↓

Flask Backend

↓

SQLAlchemy

↓

Database


## Frontend

React handles:
- User interface
- Document editor
- Navigation
- API communication


## Backend

Flask handles:
- REST APIs
- Document operations
- Database connection


## Data Flow

1. User creates or edits document
2. Frontend sends request
3. Backend processes request
4. Database stores data
5. Response returned to frontend
3) AI_WORKFLOW.md
# AI Workflow

## Overview

Ajaia Docs supports AI-assisted document workflows.

## Workflow

User Input

↓

Document Processing

↓

AI Assistance

↓

Content Improvement

↓

Document Storage


## AI Features

- Text improvement
- Summarization
- Grammar correction
- Content suggestions


## Process

1. User enters document content
2. Backend receives data
3. AI processes content
4. Suggestions are generated
5. User saves final document
4) SUBMISSION.md
# Ajaia Docs Submission

## Project Name

Ajaia Docs - Document Editor


## Developer

Sneha Reddy


## GitHub Repository

(Add GitHub URL)


## Live Demo

Backend:

https://ajaia-docs-backend-zbin.onrender.com


Frontend:

(Add Vercel URL)


## Completed Features

✓ Document Creation

✓ Document Editing

✓ Rich Text Editor

✓ Document Saving

✓ File Upload

✓ REST API

✓ Automated Testing

✓ Deployment


## Testing

Framework:
pytest

Status:
2 tests passed
## Demo Video
