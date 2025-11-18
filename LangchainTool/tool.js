// tool.js
// tool.js
import { tool } from "@langchain/core/tools";
import { z } from "zod";

export const rankTeamsTool = tool(
  async (args) => {
    return args; // echo back
  },
  {
    name: "rank_teams_for_profile",
    description: "Scores and ranks teams for a specific profile",
    schema: z.object({
      scores: z.record(z.string(), z.number()), // team → score
      rankings: z.array(z.string()),            // ordered teams
    }),
  }
);

export const rankProfilesTool = tool(
  async (args) => {
    return args;
  },
  {
    name: "rank_profiles_for_team",
    description: "Scores and ranks profiles for a specific team",
    schema: z.object({
      scores: z.record(z.string(), z.number()), // profile → score
      rankings: z.array(z.string()),            // ordered profiles
    }),
  }
);


// import { tool } from "@langchain/core/tools";
// import { compatibilitySchema } from "./schema.js";

// export const rankTeamsForPerson = tool({
//   name: "rank_teams_for_person",
//   description: "Ranks all teams for a given person based on compatibility scores.",
//   schema: z.object({
//     data: compatibilitySchema,
//     person: z.string()
//   }),
//   execute: async ({ data, person }) => {
//     const personScores = data.scores[person];
//     if (!personScores) {
//       return { error: `Person '${person}' not found.` };
//     }

//     const ranked = Object.entries(personScores)
//       .sort((a, b) => b[1] - a[1])
//       .map(([team, score]) => ({ team, score }));

//     return { person, rankedTeams: ranked };
//   }
// });

// export const rankProfilesForTeam = tool({
//   name: "rank_profiles_for_team",
//   description: "Ranks all people for a given team based on compatibility & team ranking preference.",
//   schema: z.object({
//     data: compatibilitySchema,
//     team: z.string()
//   }),

//   execute: async ({ data, team }) => {
//     const teamPref = data.rankings[team];
//     if (!teamPref) {
//       return { error: `Team '${team}' not found.` };
//     }

//     // Map preference → weight
//     const prefWeight = {};
//     teamPref.forEach((person, index) => {
//       prefWeight[person] = 100 - index; 
//     });

//     const results = Object.entries(data.scores)
//       .map(([person, teamScores]) => {
//         const compatScore = teamScores[team] ?? 0;
//         const preference = prefWeight[person] ?? 0;
//         const finalScore = compatScore + preference;

//         return { person, compatScore, preference, finalScore };
//       })
//       .sort((a, b) => b.finalScore - a.finalScore);

//     return { team, rankedProfiles: results };
//   }
// });


