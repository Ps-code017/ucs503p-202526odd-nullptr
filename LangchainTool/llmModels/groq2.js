// groq2.js
import { ChatGroq } from "@langchain/groq";
import { rankTeamsTool, rankProfilesTool } from "../tool.js";

const openai = new ChatGroq({
  model: "openai/gpt-oss-20b",
  temperature: 0,
}).bindTools([rankTeamsTool, rankProfilesTool]); // 👈 critical

export default openai;
