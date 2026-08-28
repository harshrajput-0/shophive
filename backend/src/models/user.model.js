import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        index: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ["user", "vendor", "admin"],
        default: "user",
    },
    // For vendor storefront
    avatar: {
        type: String,
    },
    description: {
        type: String,
    },
    // isMock is for seeded demos only
    isMock: {
        type: Boolean,
        default: false,
    },
},
    { timestamps: true }
)



const User = mongoose.model("User", userSchema);

export default User;