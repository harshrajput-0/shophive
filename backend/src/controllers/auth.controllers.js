import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { sendEmail } from "../utils/email.js";

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};


// ====| REGISTER USER |-------------------------
export const registerUser = async (req, res) => {
    try {

        // GET fields from req.body
        const { name, email, password } = req.body;

        // check if user exist, if yes throw error
        const userExist = await User.findOne({ email });
        if (userExist) {
            return res.status(400).json({ message: "User already exists " });
        };

        // add salt to password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // create the user
        const user = await User.create({ name, email, password: hashedPassword });
        if (user) {
            // Welcome Message
             const message = `
                 <h2>Welcome to Shophive, ${name}!</h2>
                 <p>Thanks for creating an account with us.</p>
                 <p>We're glad to have you here. You can now explore Shophive and start using your account.</p>
                 <p>Enjoy your experience!</p>
                 <p>— The Shophive Team</p>
             `;
            // send the email
            await sendEmail({
                email: user.email,
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




