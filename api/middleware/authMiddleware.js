const jwt = require("jsonwebtoken")

// Middelware to verify JWT token
const authenticateUser = (req, res, next) =>{
    const token = req.header("Authorization")

    if(!token) return res.status(401).json({msg:"Access denied. No token provided"})

    try {
       const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET) 
       req.user = decoded
       next()
    } catch (error) {
        res.status(403).json({msg:"Invalid token"})
    }
}

const authorizeRoles = (...allowedRoles) =>{
    return (req,res,next)=>{
        if(!req.user || !allowedRoles.includes(req.user.role)){
            console.log(`Request User: ${req.user.role}`)
            console.log(`Request user`, req.user)
            return res.status(403).json({msg:"Forbidden: You do not have permission"})
        }
        next()
    }
}

module.exports = {authenticateUser, authorizeRoles}