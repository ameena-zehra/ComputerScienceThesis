# AI-Driven Children's Book Generator

Welcome to the AI-Driven Children's Book Generator project! This web application leverages advanced AI models to generate unique and imaginative children's stories based on user-provided prompts. Designed for both educators and parents, this tool aims to create engaging, creative, and emotionally resonant narratives that capture the wonder and magic of traditional children's literature.

## Features:
Custom Story Prompts: Users can input specific prompts to guide the story generation process, ensuring personalized and relevant content.
AI-Generated Illustrations: Each story comes with visually appealing illustrations that enhance the narrative and engage young readers.
Seamless Integration: Built with ReactJS for the front-end and Node.js for the back-end, the application communicates with the OpenAI API to generate both text and images.
Synchronous Requests: The application ensures real-time responses by making synchronous API calls, providing users with instant story generation.

## How It Works:
1. Enter a Prompt: Users provide a brief prompt or idea for the story.
2. Story Generation: The back-end Node.js server processes the prompt and sends a request to the OpenAI API.
3. Illustration Creation: Along with the narrative, the AI generates corresponding illustrations to complement the story.
4. Display and Download: The generated story and illustrations are displayed on the front-end, where users can read or download the content.

## Table of Contents

- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Installation

Follow these steps to set up the project locally.

1. **Clone the repository**


2. **Backend Setup:**

   - Navigate to the `backend` directory:
     ```bash
     cd backend
     ```
   - (Optional) Create a virtual environment:
     ```bash
     python3 -m venv venv
     source venv/bin/activate  # On Windows use `venv\Scripts\activate`
     ```
   - Install the required dependencies:
     ```bash
     pip install -r requirements.txt
     ```

3. **Frontend Setup:**

   - Navigate to the `frontend` directory:
     ```bash
     cd frontend
     ```
   - Install the required dependencies:
     ```bash
     npm install
     ```

## Running the Application

The application requires two terminals to run the backend and frontend separately.

1. **Start the Backend:**

   - Open the first terminal:
     ```bash
     cd backend
     python3 app.py
     ```
   - The backend should now be running on `http://localhost:5000`.

2. **Start the Frontend:**

   - Open the second terminal:
     ```bash
     cd frontend
     npm run dev
     ```
   - The frontend should now be running on `http://localhost:5173/`.

## Technologies Used

- **Backend:**
  - Python
  - Flask
  - Additional libraries

- **Frontend:**
  - JavaScript
  - React 
  - Additional libraries (Redux, Axios)
