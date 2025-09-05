// groq2.js
import { ChatGroq } from "@langchain/groq";
import { compatibilityTool, profileTeamTool } from "../tool.js";

const openai = new ChatGroq({
  model: "openai/gpt-oss-20b",
  temperature: 0,
}).bindTools([compatibilityTool,profileTeamTool]); // 👈 critical

export default openai;
