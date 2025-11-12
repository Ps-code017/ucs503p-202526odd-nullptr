🚀 TeamUp Matchmaker Core: LLM Compatibility Engine
This repository hosts the proof-of-concept backend service for the TeamUp platform's intelligent matchmaking. It demonstrates a cutting-edge approach: leveraging a Large Language Model (LLM) and its Tool-Calling capability to function as a highly flexible and accurate Compatibility Engine.

🌟 Core Utility & Problem Solved: 
The main challenge for TeamUp is accurately connecting diverse student talent with niche project needs. This service solves the need for a "Tag-based similarity scoring system" (as described in the project report) without requiring complex, hard-coded algorithms.

Key Advantages: 
Intelligent Matching: The LLM acts as a Compatibility Engine, analyzing unstructured student skills (e.g., "Python, Flask, UI/UX") against structured team needs (e.g., "Mental Health Chatbot").

Structured Output: Using Tool-Calling, the LLM is forced to return highly reliable, structured JSON data containing score (0-100) and ordered rankings, making the results instantly usable by the frontend.

Flexibility: This approach makes the matching system easily adaptable. Changing the criteria for a "good match" only requires updating the system prompt, not rewriting complex scoring logic.

⚙️ API Endpoints (Node/Express)
The server exposes two main endpoints to demonstrate comprehensive matching capability using pre-loaded team and profile data.

1. /api/profile-rank
Goal: Profile Ranking per Team

Output: Returns lists of student profiles ranked (most to least suitable) for each specific team project.

2. /api/team-rank
Goal: Team Ranking per Profile

Output: Returns lists of team projects ranked (most to least interesting) for each individual student profile.

The result of both calls is a structured JSON object, directly providing the data needed to display personalized teammate suggestions to the end-user.
