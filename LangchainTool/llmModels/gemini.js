import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { compatibilitySchema } from "../schema.js";
import { compatibilityTool } from "../tool.js";

const model = new ChatGoogleGenerativeAI({
  model: "gemini-2.0-flash",
  temperature: 0
}).bindTools([compatibilityTool]);

export default model
