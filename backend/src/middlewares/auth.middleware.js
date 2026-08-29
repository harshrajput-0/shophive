import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protect = async (req, res, next) => {
  // initialize the token
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select("-password");

      // Prevent requests from continuing when the JWT is valid but the user account
      // no longer exists. Without this check, req.user would be null and downstream
      // controllers accessing req.user._id or req.user.role would throw a TypeError
      // instead of returning a proper 401 Unauthorized response.
      if (!req.user) {
        return res.status(401).json({ message: "Not authorized - User no longer exists" });
      }

      next();
    } catch (error) {
      console.error(error);
      res.status(401).json({ message: "Not authorized - Token invalid" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized - No Token" });
  }
};
