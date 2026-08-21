import User from "../models/user.model";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/email";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_TOKEN_SECRET, { expiresIn: "30d" });
};


// ====| REGISTER USER |-------------------------
export const registerUser = async (req, res) => {
    try {

        // GET fields from req.body
        const { name, email, password } = req.body;

        // check if user exist, if yes throw error
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "User already exists " });
        };

        // add salt to password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create the user
        const user = await User.create({ name, email, password: hashedPassword });
        if (user) {
            // if created create otp

            const otp = Math.floor(100000 + Math.random() * 900000);

            // otp or welcome message
            const message = `
                 <h2> Welcome to Shophive, ${name}<h2/>
                 <p>Thank you for registering on our platform.</p>
                 <p>Your one-time verification/discount OTP is: <strong>${otp}</strong></p>
                `
            // send the email
            await sendEmail({
                name: user.name,
                subject: "Welcome to Shophive - Your OTP",
                message
            })

            // send resoponse with data
            res.status(200).json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });

        } else {
            // send response
            res.status(400).json({ message: "Invalid User Data" });
        }

    } catch (error) {


        // catch any error messages
        res.status(500).json({ message: error.message });
    }
}



// ====| LOGIN USER |------------------------------

// get fiels from request
// find the user
// validate user
// validate password

// catch error message



// ====| GET USERS |-----------------------------

// Get users without password




