import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.models.js";
import { ApiError } from "../utils/apiError.js";
import { ApiResponse } from "../utils/apiResponse.js";

export const getProfile=asyncHandler(async(req,res)=>{
    const user=await User.findById(req.user._id).select("-googleId -refreshToken")
    if(!user){
        throw new ApiError(404,"User not found")
    }
    return res.status(200).json(new ApiResponse(200,"User profile fetched successfully",user))
})

export const updateProfile=asyncHandler(async(req,res)=>{
    const {skills} = req.body;
    const updated=await User.findByIdAndUpdate(
        req.user._id,
        { skills },
        { new: true }
    ).select("-googleId -refreshToken");
    if(!updated){
        throw new ApiError(404,"User not found")
    }
    return res.status(200).json(new ApiResponse(200,"User profile updated successfully",updated))
})

export const searchUsers=asyncHandler(async(req,res)=>{
    const {query}=req.query;
    if(!query){
        throw new ApiError(400,"query parameter is required")
    }
    const users=await User.find({
        name: { $regex: query, $options: "i" }
    }).select("-googleId -refreshToken");
    return res.status(200).json(new ApiResponse(200,"Users fetched successfully",users))
    
})