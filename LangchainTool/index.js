import express from "express";
import cors from "cors";
// import { compatibilityTool, profileTeamTool } from "./tool.js";
import openai  from "./llmModels/groq2.js"; // your existing OpenAI client
import connectDB from "./db/index.js";



//WORK TO DO -> USERS -> INDIVIDUALS
// MODELS CAHNGE ACC TO REFRESH TOKEN AND ALL

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || "http://localhost:3000",    //frontend ka address will come here
  credentials: true, 
})); // Adjust if frontend uses another port


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser())

//routes

import authRouter from "./routes/auth.routes.js"
import userRouter from "./routes/user.routes.js"
import teamRouter from "./routes/team.routes.js"
import rankingRouter from "./routes/rankings.routes.js"
import cookieParser from "cookie-parser";

app.use("/api/auth", authRouter);
app.use("/api/users", userRouter);
app.use("/api/teams", teamRouter);
app.use("/api/rank", rankingRouter);



connectDB().then(() => {
  app.listen(3000, () => console.log("✅ Server running on http://localhost:3000"));
}).catch((err) => {
  console.error("Failed to connect to the database:", err);
})

// // -----------------------------
// //  PROFILE → TEAM ranking
// // -----------------------------
// // app.get("/api/profile-rank", async (req, res) => {
// //   try {
// //     const response = await openai.invoke(
// //       [
// //         {
// //           role: "system",
// //           content: `You are a compatibility engine.
// // You must call the tool "compatibility_scorer".
// // Return an object with this schema exactly:
// // {
// //   "scores": { "Alex": { "Team 1": 85, "Team 2": 25, ... } },
// //   "rankings": { "Team 1": ["Alex", "Priya", "Rohan", "Maya", "Sara"], ... }
// // }
// // Rules:
// // - Include all profiles and teams.
// // - "scores" must have every profile scored for every team.
// // - "rankings" must be per team (ordered best to worst).`,
// //         },
// //         {
// //           role: "user",
// //           content: JSON.stringify({
// //             teams: [
// //               { name: "Team 1 AI Web App", skills: ["Python", "Machine Learning", "React", "REST APIs", "Git"] },
// //               { name: "Team 2 Blockchain Voting System", skills: ["Solidity", "Smart Contracts", "Web3.js", "Frontend (any framework)", "Cryptography"] },
// //               { name: "Team 3 Health Monitoring IoT", skills: ["C++", "Arduino", "Sensors", "Data Visualization", "Embedded Systems"] },
// //               { name: "Team 4 Mental Health Chatbot", skills: ["NLP", "Python", "Flask", "UI/UX Design", "Firebase"] },
// //               { name: "Team 5 E-commerce Analytics Dashboard", skills: ["JavaScript", "Data Analysis", "D3.js", "SQL", "AWS"] }
// //             ],
// //             profiles: [
// //               { name: "Alex", skills: ["Python", "React", "Git", "Flask", "Data Analysis"] },
// //               { name: "Priya", skills: ["Solidity", "Smart Contracts", "Cryptography", "JavaScript", "Web3.js"] },
// //               { name: "Rohan", skills: ["C++", "Arduino", "Embedded Systems", "Sensors", "Python"] },
// //               { name: "Maya", skills: ["NLP", "Python", "UI/UX Design", "Firebase", "HTML/CSS"] },
// //               { name: "Sara", skills: ["SQL", "AWS", "JavaScript", "D3.js", "Data Visualization"] }
// //             ],
// //           }),
// //         },
// //       ],
// //       {
// //         tools: [compatibilityTool],
// //       }
// //     );

// //     return res.json(response.tool_calls);
// //   } catch (err) {
// //     console.error("Error:", err.message);
// //     return res.status(500).json({ error: "Failed to calculate compatibility" });
// //   }
// // });
// app.get('/api/team-rank',verifyJWT, async(req, res) => {
//   try {
//     const { profileId, search } = req.body;

//     const profile = await User.findById(profileId);
//     if (!profile) return res.status(404).json({ error: "Profile not found" });

//     // 🔥 fetch teams from DB
//     let teams = await Team.find();

//     // 🔥 apply search filter
//     if (search && search.trim() !== "") {
//       teams = teams.filter(t =>
//         t.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     // Transform for LLM
//     const teamsData = teams.map(t => ({
//       name: t.name,
//       skills: t.techStack
//     }));

//     const profileData = {
//       name: profile.name,
//       skills: profile.techStack
//     };

//     // Call LLM tool
//     const aiResponse = await openai.invoke(
//       `Rank these teams for the given profile based on compatibility.`,
//       {
//         tools: { compatibility_scorer: { teams: teamsData, profiles: [profileData] } }
//       }
//     );

//     return res.json(aiResponse.tool_calls[0].arguments);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// })

// // -----------------------------
// //  TEAM → PROFILE ranking
// // -----------------------------
// // app.get("/api/team-rank", async (req, res) => {
// //   try {
// //     const response = await openai.invoke(
// //       [
// //         {
// //           role: "system",
// //           content: `
// // You are a compatibility engine.
// // You must call the tool "profile_team_scorer".
// // Return a JSON exactly matching:
// // {
// //   "scores": {
// //     "Alex": { "Team 1": 85, "Team 2": 25, ... },
// //     "Priya": { ... }
// //   },
// //   "rankings": {
// //     "Alex": ["Team 1", "Team 4", "Team 5", "Team 3", "Team 2"],
// //     "Priya": ["Team 2", "Team 5", "Team 1", "Team 3", "Team 4"]
// //   }
// // }
// // Rules:
// // - “scores” → profile → all teams.
// // - “rankings” → profile → ordered list of team names (most suitable → least suitable).`,
// //         },
// //         {
// //           role: "user",
// //           content: JSON.stringify({
// //             teams: [
// //               { name: "Team 1 AI Web App", skills: ["Python", "Machine Learning", "React", "REST APIs", "Git"] },
// //               { name: "Team 2 Blockchain Voting System", skills: ["Solidity", "Smart Contracts", "Web3.js", "Frontend (any framework)", "Cryptography"] },
// //               { name: "Team 3 Health Monitoring IoT", skills: ["C++", "Arduino", "Sensors", "Data Visualization", "Embedded Systems"] },
// //               { name: "Team 4 Mental Health Chatbot", skills: ["NLP", "Python", "Flask", "UI/UX Design", "Firebase"] },
// //               { name: "Team 5 E-commerce Analytics Dashboard", skills: ["JavaScript", "Data Analysis", "D3.js", "SQL", "AWS"] }
// //             ],
// //             profiles: [
// //               { name: "Alex", skills: ["Python", "React", "Git", "Flask", "Data Analysis"] },
// //               { name: "Priya", skills: ["Solidity", "Smart Contracts", "Cryptography", "JavaScript", "Web3.js"] },
// //               { name: "Rohan", skills: ["C++", "Arduino", "Embedded Systems", "Sensors", "Python"] },
// //               { name: "Maya", skills: ["NLP", "Python", "UI/UX Design", "Firebase", "HTML/CSS"] },
// //               { name: "Sara", skills: ["SQL", "AWS", "JavaScript", "D3.js", "Data Visualization"] }
// //             ],
// //           }),
// //         },
// //       ],
// //       {
// //         tools: [profileTeamTool],
// //       }
// //     );

// //     return res.json(response.tool_calls);
// //   } catch (err) {
// //     console.error("Error:", err.message);
// //     return res.status(500).json({ error: "Failed to calculate profile-team compatibility" });
// //   }
// // });
// app.get('/api/profile-rank',verifyJWT, async(req, res) => {
//   try {
//     const { teamId, search } = req.body;

//     const team = await Team.findById(teamId);
//     if (!team) return res.status(404).json({ error: "Team not found" });

//     // 🔥 Fetch all profiles
//     let profiles = await User.find();

//     // 🔥 apply search on profile name
//     if (search && search.trim() !== "") {
//       profiles = profiles.filter(u =>
//         u.name.toLowerCase().includes(search.toLowerCase())
//       );
//     }

//     const teamData = {
//       name: team.name,
//       skills: team.techStack,
//     };

//     const profileData = profiles.map(p => ({
//       name: p.name,
//       skills: p.techStack,
//     }));

//     const aiResponse = await openai.invoke(
//       `Rank profiles for the given team.`,
//       {
//         tools: { compatibility_scorer: { teams: [teamData], profiles: profileData } }
//       }
//     );

//     return res.json(aiResponse.tool_calls[0].arguments);

//   } catch (err) {
//     console.log(err);
//     res.status(500).json({ error: "Server error" });
//   }
// })