// Used after protect middleware
// Authorize based on user role 

import User from "../models/user.model"

export const authorizeRole = (...roles) => ( req, res, next ) => {
    if (!req.user || !roles.includes(req.user.role)) {
        return res.status(403).json({ message: `Not authorized, requires role: ${roles.join(' or ')}`})
    }

    next();
}