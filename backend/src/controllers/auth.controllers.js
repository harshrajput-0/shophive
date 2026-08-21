import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_TOKEN_SECRET, {expiresIn: "30d"});
};


// ====| REGISTER USER |-------------------------

// GET fields from req.body
// check if user exist, if yes throw error
// add salt to password

// create the user
// if created create otp
// otp or welcome message
// send the email
// send resoponse with data

// catch any error messages



// ====| LOGIN USER |------------------------------

// get fiels from request
// find the user
// validate user
// validate password

// catch error message



// ====| GET USERS |-----------------------------

// Get users without password




