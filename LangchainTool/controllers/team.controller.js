import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";
import { Team } from "../models/team.models.js";
import { User } from "../models/user.models.js";

export const createTeam=asyncHandler(async(req,res)=>{
    const {name,requiredSkills,description}=req.body;
    if(!name || !requiredSkills){
        throw new ApiError(400,"name and requiredSkills are required")
    }
    const team=await Team.create({
        name,
        requiredSkills,description
        ,members:[{user:req.user._id, role:"admin"}]
    });
    return res.status(201).json(new ApiResponse(201,"Team created successfully",team))
})

export const joinTeam=asyncHandler(async(req,res)=>{
    const {teamId}=req.params;  
    const team=await Team.findById(teamId);
    if(!team){
        throw new ApiError(404,"Team not found")
    }
    const alreadyMember = team.members.some(
        (m) => m.user.toString() === req.user._id.toString()
    );

    if (alreadyMember) {
    throw new ApiError(400, "User already a member of the team");
    }
    team.members.push({user:req.user._id, role:"member"});
    await team.save();
    return res.status(200).json(new ApiResponse(200,"Joined team successfully",team))
})

export const getAllTeams=asyncHandler(async(req,res)=>{
    const teams=await Team.find().populate("members.user","name email skills");
    return res.status(200).json(new ApiResponse(200,"Teams fetched successfully",teams))
})

export const searchTeams=asyncHandler(async(req,res)=>{
    const {query}=req.query;
    if(!query){
        throw new ApiError(400,"query parameter is required")
    }
    const teams=await Team.find({
        name: { $regex: query, $options: "i" }
    }).populate("members.user","name email skills");
    return res.status(200).json(new ApiResponse(200,"Teams fetched successfully",teams))
})