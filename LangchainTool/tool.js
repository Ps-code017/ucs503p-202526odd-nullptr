// tool.js
import { tool } from "@langchain/core/tools";
import { compatibilitySchema } from "./schema.js";
import { z } from "zod";

export const compatibilityTool = tool(
  async (input) => {
    // Just return what the LLM generated
    return input;
  },
  {
    name: "compatibility_scorer",
    description: "Outputs compatibility scores and rankings for all people and teams.",
    schema: compatibilitySchema ,
  }
);

export const profileTeamTool = tool(
  async (input) => {
    return input;
  },
  {
    name: "profile_team_scorer",
    description: "Scores teams against profiles and ranks them (teams ranked per profile).",
    schema: compatibilitySchema,
  }
);

