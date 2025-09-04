import { ChatGroq } from "@langchain/groq";

const model = new ChatGroq({
  model: "openai/gpt-oss-20b",
  temperature: 0
});

export default model