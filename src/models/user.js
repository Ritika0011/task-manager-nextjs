import mongoose, {Schema, mongo } from "mongoose";

const UserSachema = new Schema({
    name: String,
    email: {
        type: String,
        required: [true, "Email required !!"],
    },
    password:{
        type: String,
        required: [true, "password required"],
    },
    about: String,
    profileURL: String,

});

export const User = mongoose.models.users ||  mongoose.model("users", UserSachema);