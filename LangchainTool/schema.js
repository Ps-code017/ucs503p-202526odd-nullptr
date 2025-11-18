// import { z } from "zod";
// import { tool } from "@langchain/core/tools";

// // Each person has scores for all 5 teams


// // Whole dataset for all people
// export const compatibilitySchema =z.object({
//       scores: z.record(
//         z.string(), // person
//         z.record(
//           z.string(), // team
//           z.number().min(0).max(100) // score
//         )
//       ),
//       rankings: z.record(
//         z.string(), // team
//         z.array(z.string()) // ordered list of names
//       ),
//     })

import { z } from "zod";
import { tool } from "@langchain/core/tools";

export const compatibilityTool = tool({
  name: "compatibility_scorer",
  description: "Compute person → team compatibility scores.",
  schema: z.object({
    scores: z.record(z.record(z.number())),
    rankings: z.record(z.array(z.string()))
  }),
  execute: async (args) => args
});

export const profileTeamTool = tool({
  name: "profile_team_ranker",
  description: "Compute team → profile compatibility scores.",
  schema: z.object({
    scores: z.record(z.record(z.number())),
    rankings: z.record(z.array(z.string()))
  }),
  execute: async (args) => args
});

// import { z } from "zod";

// // Each person has scores for all teams
// // Each team has an ordered list of preferred people

// export const compatibilitySchema = z.object({
//   scores: z.record(
//     z.string(), // personName
//     z.record(
//       z.string(), // teamName
//       z.number().min(0).max(100) // compatibility score
//     )
//   ),

//   rankings: z.record(
//     z.string(),  // teamName
//     z.array(z.string()) // ordered people list
//   )
// });

