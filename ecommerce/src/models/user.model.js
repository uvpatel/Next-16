import mongoose, {Schema , model } from "mongoose";


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: [true,"Please provide a username"],
        unique: true,
    },
    password: {
        type: String,
        required: [true,"Please provide a username"],
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    forgetPasswordToken: String,
    forgetPasswordTokenExpiry: Date,
    verifyToken: String,
    verifyTokenExpiry: Date

}, {timestamps: true})


export  const User =  models.User || model('User', userSchema)


