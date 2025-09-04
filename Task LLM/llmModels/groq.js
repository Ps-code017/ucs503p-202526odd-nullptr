import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "llama-3.1-8b-instant",
  temperature: 0
});

export default model