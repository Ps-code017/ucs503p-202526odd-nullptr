import { z } from "zod";
import { tool } from "@langchain/core/tools";

// Each person has scores for all 5 teams


// Whole dataset for all people
export const compatibilitySchema =z.object({
      scores: z.record(
        z.string(), // person
        z.record(
          z.string(), // team
          z.number().min(0).max(100) // score
        )
      ),
      rankings: z.record(
        z.string(), // team
        z.array(z.string()) // ordered list of names
      ),
    })
