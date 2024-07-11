import jwt from "jsonwebtoken";

export const verifyToken = async(req,res) =>{
    try {
        let token = req.header("Authorization");

        if(!token) return res.status(404).json({success:false, message:"INVALID TOKEN "});

        if(token.startsWith("Bearer ")){
            token = token.slice(7, token.length).trimLeft();
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);

        req.user = verified;
        
        next();

    } catch (error) {
        return res.status(500).json({success:false, message:"ERROR IN VERIFY TOKEN "+error})
    }
}