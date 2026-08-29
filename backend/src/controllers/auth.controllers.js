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
    }

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
        message,
      });

      // send resoponse with data
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      // send response
      res.status(400).json({ message: "Invalid User Data" });
    }
  } catch (error) {
    // catch any error messages
    res.status(500).json({ message: error.message });
  }
};

// ====| LOGIN USER |------------------------------
export const loginUser = async (req, res) => {
  try {
    // get fiels from request
    const { email, password } = req.body;

    // find the user
    const user = await User.findOne({ email });

    // validate user
    if (!user) {
      return res.status(401).json({ message: "Invalid Credentials " });
    }
    // validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid Credentials " });
    }

    // send response
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } catch (error) {
    // catch error message
    return res.status(500).json({ message: error.message });
  }
};

// ====| GET VENDOR BY ID |--------------------------------------------------
// Public storefront profile: name/avatar/description only, and only for
// accounts that are actually vendors. Used by VendorPublicPage even when
// the vendor has zero products.
export const getVendorById = async (req, res) => {
  try {
    const vendor = await User.findOne({ _id: req.params.id, role: "vendor" }).select(
      "name avatar description"
    );
    if (!vendor) {
      return res.status(404).json({ message: "Vendor not found" });
    }
    res.json(vendor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====| GET USERS |-------------------------------------------
export const getUsers = async (req, res) => {
  try {
    // Get users without password
    const users = await User.find({}).select("-password");
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====| UPDATE USER ROLE |--------------------------------------------------
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;

    if (!["user", "vendor"].includes(role)) {
      return res.status(400).json({ message: "Role must be 'user' or 'vendor'" });
    }

    const targetUser = await User.findById(req.params.id);
    if (!targetUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (targetUser.isMock) {
      return res.status(400).json({ message: "Cannot modify a mock/demo account" });
    }

    if (targetUser.role === "admin") {
      return res.status(400).json({ message: "Cannot modify a admin's role here" });
    }

    if (req.user.isMock) {
      return res.json({
        _id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        role,
        isMock: true,
      });
    }

    targetUser.role = role;
    const updated = await targetUser.save();

    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ====| UPDATE PROFILE |--------------------------------------------------
export const updateProfile = async (req, res) => {
  try {
    const { name, avatar, description } = req.body;

    if (req.user.isMock) {
      return res.json({
        _id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
        avatar: avatar ?? req.user.avatar,
        description: description ?? req.user.description,
        isMock: true,
      });
    }

    const user = await User.findById(req.user._id);
    if (name !== undefined) user.name = name;
    if (avatar !== undefined) user.avatar = avatar;
    if (description !== undefined) user.description = description;

    const updated = await user.save();
    res.json({
      _id: updated._id,
      name: updated.name,
      email: updated.email,
      role: updated.role,
      avatar: updated.avatar,
      description: updated.description,
    });
  } catch (error) {
    const status = error.name === "Validation Error" ? 400 : 500;
    res.status(status).json({ message: error.message });
  }
};
