import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";


// import Post from "./models/Post.js";
// import User from "./models/User.js";

// import {users  ,posts} from "./data/index.js"

import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/users.js"
import postsRouts from "./routes/posts.js"



import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/posts.js";

import { verifyToken } from "./middlewares/auth.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


// /* FILE STORAGE */
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/assets");
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname);
    },
  });
const upload = multer({ storage });

app.post("/auth/register",upload.single("picture"), register);

app.post("/posts", verifyToken , upload.single("picture"), createPost );


// ALL MIDDLEWARE ROUTES ......
app.use('/auth', authRoutes);

app.use("/users",userRoutes);

app.use('/posts',postsRouts)

/* MONGOOSE SETUP */
let port;
  if(!port) port = process.env.PORT;

  if(!port) port = 6000;


mongoose.connect(process.env.MONGO_URL).then(()=> {
  console.log("DB CONNECTED");
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${ port }`);
  });
}).catch((error) => console.log(`${error} did not connect `));

app.get('/fuck', (req, res) => {
  res.send('Hello World!');
});




