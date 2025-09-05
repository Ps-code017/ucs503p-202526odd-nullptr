import { ChatGroq } from "@langchain/groq";
import { compatibilitySchema } from "../schema.js";
import { compatibilityTool } from "../tool.js";

const model = new ChatGroq({
  model: "llama-3.1-8b-instant",
  temperature: 0
}).bindTools([compatibilityTool])

export default model