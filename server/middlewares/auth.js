// import jwt from "jsonwebtoken";

// export const verifyToken = async(req,res,next) =>{
//     try {


//         // console.log("Into Verify token ............")
//         // console.log("Token ",req.header("Authorization"));
//         let token = req.header("Authorization");

//         if(!token) return res.status(404).json({success:false, message:"INVALID TOKEN "});
//         const x = "";
//         if(token.startsWith("Bearer ")){
//             // token = token.slice(7, token.length).trimLeft();
//             x = token.slice(7,token.length);
//         }
//         // console.log("Completed Verification ...........")
//         console.log("TOKEN :",x)
//         // console.log(jwt.verify(token, process.env.JWT_SECRET))
//         console.log("secret :",process.env.JWT_SECRET);
//         const verified = jwt.verify(token, process.env.JWT_SECRET);

//         req.user = verified;
//         next();

//     } catch (error) {
//         return res.status(500).json({success:false, message:"ERROR IN VERIFY TOKEN "+error})
//     }
// }

import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
  try {
    let token = req.header("Authorization");

    if (!token) {
      return res.status(403).send("Access Denied");
    }

    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length).trimLeft();
    }

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};