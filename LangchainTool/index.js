import express from "express";
import geminiModel from "./llmModels/gemini.js";
import groqModel from "./llmModels/groq.js";
import openai from "./llmModels/groq2.js";
import { compatibilitySchema } from "./schema.js";
import { StructuredOutputParser } from "@langchain/core/output_parsers";
import { tool } from "@langchain/core/tools";
import { profileTeamTool } from "./tool.js";
import z from "zod";

const prompt = `
Here are the team requirements:
Team 1 AI Web App: Python, Machine Learning, React, REST APIs, Git
Team 2 Blockchain Voting System: Solidity, Smart Contracts, Web3.js, Frontend (any framework), Cryptography
Team 3 Health Monitoring IoT: C++, Arduino, Sensors, Data Visualization, Embedded Systems
Team 4 Mental Health Chatbot: NLP, Python, Flask, UI/UX Design, Firebase
Team 5 E-commerce Analytics Dashboard: JavaScript, Data Analysis, D3.js, SQL, AWS

Here are the profiles:
Person 1 Alex: Python, React, Git, Flask, Data Analysis
Person 2 Priya: Solidity, Smart Contracts, Cryptography, JavaScript, Web3.js
Person 3 Rohan: C++, Arduino, Embedded Systems, Sensors, Python
Person 4 Maya: NLP, Python, UI/UX Design, Firebase, HTML/CSS
Person 5 Sara: SQL, AWS, JavaScript, D3.js, Data Visualization
`;

const app = express();
app.use(express.json());

app.get("/api/profile-rank", async (req, res) => {
  try {
    const response = await openai.invoke([
      {
        role: "system",
        content: `You are a compatibility engine.
You must call the tool "compatibility_scorer".
Rules:
- "scores" must be a nested dictionary: { "Alex": { "Team 1": 80, "Team 2": 20, ... }, "Priya": { ... } }
- "rankings" must be an array of names per team, e.g. { "Team 1": ["Alex", "Priya", "Rohan", "Maya", "Sara"] }
❌ NEVER output objects like {"Alex": 1, "Priya": 2}.
✔ ALWAYS output arrays in order of suitability.
Output must strictly match the tool schema.`
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
          ]
        })
      }
    ]);

    return res.json(response.tool_calls);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Failed to calculate compatibility" });
  }
});

app.get("/api/team-rank", async (req, res) => {
  try {
    const response = await openai.invoke([
      {
        role: "system",
        content: `You are a compatibility engine.
        ALWAYS use "profile_team_scorer"
- For each PROFILE, assign a score (0-100) for each TEAM based on skill overlap.
- Then, for each PROFILE, rank all teams from MOST suitable to LEAST suitable.
- Always return JSON matching schema: { "scores": {...}, "rankings": {...} }`
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
          ]
        })
      }
    ]);


    return res.json(response.tool_calls);
  } catch (err) {
    console.error("Error:", err.message);
    return res.status(500).json({ error: "Failed to calculate profile-team compatibility" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started", `http://localhost:${process.env.PORT}`);
});
