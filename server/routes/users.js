import express from "express";
import { verifyToken } from "../middlewares/auth.js";

import {
    getUser,
    getUserFriends,
    addRemoveFriend,
} from "../controllers/users.js"



const router = express.Router();

router.get("/:Id",verifyToken, getUser);
router.get('/:id/friends',verifyToken,getUserFriends);

// router.get('/:id/:friendId',verifyToken,addRemoveFriend);
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);


export default router;