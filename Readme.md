# 🚀 TeamUp Matchmaker Core: LLM Compatibility Engine

This repository hosts the **proof-of-concept backend service** for the **TeamUp** platform’s intelligent matchmaking system.  
It demonstrates a **cutting-edge approach**: leveraging a **Large Language Model (LLM)** with **Tool-Calling** capabilities to function as a **highly flexible and accurate Compatibility Engine** for project–student matchmaking.

🔗 **Live Demo:** [[https://team-up-nullptrs.vercel.app/](https://team-up-nullptrs.vercel.app/)]

---

## 🌟 Core Utility & Problem Solved

### 🎯 The Challenge!
TeamUp’s primary goal is to **connect diverse student talent** with **niche project needs**.  
Traditional rule-based or keyword-matching systems fail to understand nuanced skill descriptions like:
> “Python, Flask, UI/UX” vs “Mental Health Chatbot”  

Such systems often miss meaningful matches due to lack of contextual understanding.

### 💡 The Solution
This service introduces a **Tag-based Similarity Scoring System** powered by an **LLM-based Compatibility Engine**.  
Instead of using hard-coded logic, the LLM evaluates **semantic similarity**, **context**, and **intent**, producing **structured JSON results** with high interpretability and adaptability.

---

## 🧠 Key Advantages

### 1. 🤖 Intelligent Matching  
The LLM analyzes **unstructured skill data** (e.g., “Machine Learning, React, Flask”) against **structured project requirements** (e.g., “AI-based Learning Assistant”) and outputs **compatibility scores (0–100)**.

### 2. 🧩 Structured & Reliable Output  
By leveraging **Tool-Calling**, the LLM is forced to respond with **consistent, structured JSON**, ensuring the output can be consumed directly by the frontend with **no manual parsing or cleanup**.

Example JSON output:
```json
{
  "team_name": "Mental Health Chatbot",
  "rankings": [
    { "profile_id": "S101", "score": 92 },
    { "profile_id": "S103", "score": 85 },
    { "profile_id": "S107", "score": 74 }
  ]
}




