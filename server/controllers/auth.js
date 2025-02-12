import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const register = async(req,res) =>{
    // console.log("ON REGISTER ...")
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            picturePath,
            friends,
            location,
            occupation,
        } = req.body;

        const salt = await bcrypt.genSalt();
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            firstName,
            lastName,
            email,
            password: hashPassword,
            picturePath,
            friends,
            location,
            occupation,
            viewedProfile: Math.floor(Math.random() * 10000),
            impressions: Math.floor(Math.random() * 10000),
        });

        const savedUser = await newUser.save();
        return res.status(200).json( { success:true, savedUser})

    } catch (error) {
        // console.log("ERROR IN REGISTER USER !!!")
        return  res.status(500).json({ error: err.message });
    }
}
 
export const login = async(req,res) =>{
    try {
        const { email ,password} = req.body;
        // console.log("Calling login")
        
        const user = await User.findOne({email:email});
        
        if(!user) {
            return res.status(404).json({success:false, message:"User Not Found !!!"})
        }

        const isMatch = bcrypt.compare(password,user.password);

        if(!isMatch) return res.status(500).json({success:false, message:"Wrong Password !!!"}) 

        const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET);

        delete user.password;

        return  res.status(200).json({ token, user});

    } catch (error) {
        return res.status(500).json({success:false, message:"ERROR IN LOGIN USER !!!"}) 
    }
}



