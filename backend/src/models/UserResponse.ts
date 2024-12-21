import mongoose from "mongoose";

export interface UserResponse {
  _id: mongoose.Types.ObjectId;
  name: string;
  email: string;
}
