import express from "express";
import geminiModel from "./llmModels/gemini.js";
import groqModel from "./llmModels/groq.js";
import openai from "./llmModels/groq2.js";
// import claudeModel from "./llmModels/claude.js";  // example if you have Claude

const app = express();
app.use(express.json());

const prompt = `
You are an expert in skill matching. 
I will give you team requirements and individual profiles. 
For each person, calculate a compatibility score (0–100) for each team 
based on how many required skills they match. 

Return the result STRICTLY in JSON format like this:
{
  "PersonName": {
    "Team 1  AI Web App": score,
    "Team 2  Blockchain Voting System": score,
    ...
  }
}

Here are the team requirements:
Team 1  AI Web App: Python, Machine Learning, React, REST APIs, Git
Team 2  Blockchain Voting System: Solidity, Smart Contracts, Web3.js, Frontend (any framework), Cryptography
Team 3  Health Monitoring IoT: C++, Arduino, Sensors, Data Visualization, Embedded Systems
Team 4  Mental Health Chatbot: NLP, Python, Flask, UI/UX Design, Firebase
Team 5  E-commerce Analytics Dashboard: JavaScript, Data Analysis, D3.js, SQL, AWS

Here are the profiles:
Person 1  Alex: Python, React, Git, Flask, Data Analysis
Person 2  Priya: Solidity, Smart Contracts, Cryptography, JavaScript, Web3.js
Person 3  Rohan: C++, Arduino, Embedded Systems, Sensors, Python
Person 4  Maya: NLP, Python, UI/UX Design, Firebase, HTML/CSS
Person 5  Sara: SQL, AWS, JavaScript, D3.js, Data Visualization

IMPORTANT: Do not output any text, explanation, or markdown formatting outside of the single JSON object.
  JSON Response:
`;

async function runLLM(model, prompt) {
  try {
    const response = await model.invoke(prompt);
    console.log(response);
    
    const textOutput = response?.content?.[0]?.text || response?.text || "";

    const cleanOutput = textOutput
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    return JSON.parse(cleanOutput);
  } catch (e) {
    console.log(e.message)
    return { error: `Failed for ${model?.constructor?.name || "LLM"}` };
  }
}

app.get("/api/allllm", async (req, res) => {
  const results = await Promise.all([
    runLLM(geminiModel, prompt),
    runLLM(groqModel, prompt),
    runLLM(openai, prompt),
  ]);

  return res.json({
    gemini: results[0],
    groq1: results[1],
    openai: results[2],
  });
});

app.get("/api/gemini",async(req,res)=>{
    const result = await runLLM(geminiModel,prompt)
    return res.json(result)
})
app.get("/api/groq",async(req,res)=>{
    const result = await runLLM(groqModel,prompt)
    return res.json(result)
})
app.get("/api/openai",async(req,res)=>{
    const result = await runLLM(groqModel2,prompt)
    return res.json(result)
})

app.listen(process.env.PORT || 3000, () => {
  console.log("Server started", `http://localhost:${process.env.PORT}`);
});
