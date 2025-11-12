import express from "express";
import cors from "cors";
import { compatibilityTool, profileTeamTool } from "./tool.js";
import openai  from "./llmModels/groq2.js"; // your existing OpenAI client

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",    //frontend ka address will come here
  credentials: true, 
})); // Adjust if frontend uses another port

// -----------------------------
//  PROFILE → TEAM ranking
// -----------------------------
app.get("/api/profile-rank", async (req, res) => {
  try {
    const response = await openai.invoke(
      [
        {
          role: "system",
          content: `You are a compatibility engine.
You must call the tool "compatibility_scorer".
Return an object with this schema exactly:
{
  "scores": { "Alex": { "Team 1": 85, "Team 2": 25, ... } },
  "rankings": { "Team 1": ["Alex", "Priya", "Rohan", "Maya", "Sara"], ... }
}
Rules:
- Include all profiles and teams.
- "scores" must have every profile scored for every team.
- "rankings" must be per team (ordered best to worst).`,
        },
        {
          role: "user",
          content: JSON.stringify({
            teams: [
              { name: "Team 1 AI Web App", skills: ["Python", "Machine Learning", "React", "REST APIs", "Git"] },
              { name: "Team 2 Blockchain Voting System", skills: ["Solidity", "Smart Contracts", "Web3.js", "Frontend (any framework)", "Cryptography"] },
              { name: "Team 3 Health Monitoring IoT", skills: ["C++", "Arduino", "Sensors", "Data Visualization", "Embedded Systems"] },
              { name: "Team 4 Mental Health Chatbot", skills: ["NLP", "Python", "Flask", "UI/UX Design", "Firebase"] },
              { name: "Team 5 E-commerce Analytics Dashboard", skills: ["JavaScript", "Data Analysis", "D3.js", "SQL", "AWS"] }
            ],
            profiles: [
              { name: "Alex", skills: ["Python", "React", "Git", "Flask", "Data Analysis"] },
              { name: "Priya", skills: ["Solidity", "Smart Contracts", "Cryptography", "JavaScript", "Web3.js"] },
              { name: "Rohan", skills: ["C++", "Arduino", "Embedded Systems", "Sensors", "Python"] },
              { name: "Maya", skills: ["NLP", "Python", "UI/UX Design", "Firebase", "HTML/CSS"] },
              { name: "Sara", skills: ["SQL", "AWS", "JavaScript", "D3.js", "Data Visualization"] }
            ],
          }),
        },
      ],
      {
        tools: [compatibilityTool],
      }
    );

    return res.json(response.tool_calls);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Failed to calculate compatibility" });
  }
});

// -----------------------------
//  TEAM → PROFILE ranking
// -----------------------------
app.get("/api/team-rank", async (req, res) => {
  try {
    const response = await openai.invoke(
      [
        {
          role: "system",
          content: `
You are a compatibility engine.
You must call the tool "profile_team_scorer".
Return a JSON exactly matching:
{
  "scores": {
    "Alex": { "Team 1": 85, "Team 2": 25, ... },
    "Priya": { ... }
  },
  "rankings": {
    "Alex": ["Team 1", "Team 4", "Team 5", "Team 3", "Team 2"],
    "Priya": ["Team 2", "Team 5", "Team 1", "Team 3", "Team 4"]
  }
}
Rules:
- “scores” → profile → all teams.
- “rankings” → profile → ordered list of team names (most suitable → least suitable).`,
        },
        {
          role: "user",
          content: JSON.stringify({
            teams: [
              { name: "Team 1 AI Web App", skills: ["Python", "Machine Learning", "React", "REST APIs", "Git"] },
              { name: "Team 2 Blockchain Voting System", skills: ["Solidity", "Smart Contracts", "Web3.js", "Frontend (any framework)", "Cryptography"] },
              { name: "Team 3 Health Monitoring IoT", skills: ["C++", "Arduino", "Sensors", "Data Visualization", "Embedded Systems"] },
              { name: "Team 4 Mental Health Chatbot", skills: ["NLP", "Python", "Flask", "UI/UX Design", "Firebase"] },
              { name: "Team 5 E-commerce Analytics Dashboard", skills: ["JavaScript", "Data Analysis", "D3.js", "SQL", "AWS"] }
            ],
            profiles: [
              { name: "Alex", skills: ["Python", "React", "Git", "Flask", "Data Analysis"] },
              { name: "Priya", skills: ["Solidity", "Smart Contracts", "Cryptography", "JavaScript", "Web3.js"] },
              { name: "Rohan", skills: ["C++", "Arduino", "Embedded Systems", "Sensors", "Python"] },
              { name: "Maya", skills: ["NLP", "Python", "UI/UX Design", "Firebase", "HTML/CSS"] },
              { name: "Sara", skills: ["SQL", "AWS", "JavaScript", "D3.js", "Data Visualization"] }
            ],
          }),
        },
      ],
      {
        tools: [profileTeamTool],
      }
    );

    return res.json(response.tool_calls);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Failed to calculate profile-team compatibility" });
  }
});

app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
