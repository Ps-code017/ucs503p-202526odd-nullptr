import { User } from "../models/user.models.js";
import { Ranking } from "../models/ranking.models.js";
import { Team } from "../models/team.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import openai from "../llmModels/groq2.js";
import { rankProfilesTool, rankTeamsTool } from "../tool.js";

export const rankTeamsForProfile=asyncHandler(async(req,res)=>{
    const profile=await User.findById(req.user._id).select("-googleId -refreshToken");
    if(!profile){
        throw new ApiError(404,"User profile not found")
    }
    const teams=await Team.find().lean()
    const llmInput = {
      profile: {
        name: profile.name,
        skills: profile.skills,
      },
      teams: teams.map(t => ({
        name: t.name,
        skills: t.requiredSkills,
      })),
    };

    const response = await openai.invoke([
      {
        role: "system",
        content: "You are the compatibility engine. You will rank the teams for profile based on how compatible they are to win hackathon based on the skills and techstack provided to you. You MUST call rank_teams_for_profile tool."
      },
      {
        role: "user",
        content: JSON.stringify(llmInput)
      }
    ],{
        tool_choice:rankTeamsTool.name
    });
    const toolCall = response.tool_calls?.[0]?.args;
    return res.status(200).json(new ApiResponse(200,"Teams ranked successfully",toolCall))
})

export const rankProfilesForTeam=asyncHandler(async(req,res)=>{
    const {teamId}=req.params;
    const  team=await Team.findById(teamId).lean();
    if(!team){
        throw new ApiError(404,"Team not found")
    }
    const profiles=await User.find().select("-googleId -refreshToken").lean();
    const llmInput = {
      team: {
        name: team.name,
        skills: team.requiredSkills,
      },
      profiles: profiles.map(p => ({
        name: p.name,
        skills: p.skills,
      })),
    };
    const response = await openai.invoke([
      {
        role: "system",
        content: "You are compatibility engine. You will rank the profiles for the given team based on how compatible they are to win hackathon based on the skills and techstack provided to you. You MUST call rank_profiles_for_team tool."
      },
      {
        role: "user",
        content: JSON.stringify(llmInput)
      }
    ],{
        tool_choice:rankProfilesTool.name
    });
    const toolCall = response.tool_calls?.[0]?.args;
    return res.status(200).json(new ApiResponse(200,"Profiles ranked successfully",toolCall))
})


