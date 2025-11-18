import mongoose from "mongoose";
import dotenv from "dotenv";
import { User } from "./models/user.models.js";
import { Team } from "./models/team.models.js";

dotenv.config({ path: "./.env" });

const MONGO_URI = process.env.MONGODB_URL;

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("MongoDB Connected");

    // CLEAR EXISTING DATA (optional safety)
    // await User.deleteMany({});
    // await Team.deleteMany({});

    console.log("Old data cleared");

    // SAMPLE USERS
    const users = await User.insertMany([
      {
        name: "Pranjal Satti",
        email: "pranjal@thapar.edu",
        skills: ["Node.js", "MongoDB", "React"],
      },
      {
        name: "Aryan Kumar",
        email: "aryan@thapar.edu",
        skills: ["Python", "ML", "Deep Learning"],
      },
      {
        name: "Kavya Mehta",
        email: "kavya@thapar.edu",
        skills: ["UI/UX", "Figma", "Frontend"],
      }
    ]);

    console.log("Users Seeded");

    // SAMPLE TEAMS
    const teams = await Team.insertMany([
      {
        name: "AI Innovators",
        description: "Team that builds ML/AI projects",
        requiredSkills: ["Python", "ML"],
      },
      {
        name: "Web Wizards",
        description: "Full-stack web development team",
        requiredSkills: ["Node.js", "React", "MongoDB"],
      },
      {
        name: "Design Squad",
        description: "UI/UX team for creative projects",
        requiredSkills: ["Figma", "UI/UX"],
      }
    ]);

    console.log("Teams Seeded");

    console.log("\n🌱 Seed Completed Successfully!");
    console.log("Users:", users.length, "Teams:", teams.length);

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
