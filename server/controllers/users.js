import User from "../models/User.js";
import e from "express";
/* READ */
export const getUser = async (req, res) => {
    try {
        const { Id } = req.params;
        const user = await User.findById(Id);
        return res.status(200).json(user);
    } catch (err) {
        return res.status(404).json({success:false , message: err });
    }
};

export const getUserFriends = async (req, res) => {
    try {

        const { id } = req.params;
        console.log("ID : ",id);
        const user = await User.findById(id);

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        return res.status(200).json(formattedFriends);
    } catch (err) {
        return res.status(404).json({ message: err.message });
    }
};

/* UPDATE */
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
        const user = await User.findById(id);
        const friend = await User.findById(friendId);

        if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
        } else {
            user.friends.push(friendId);
            friend.friends.push(id);
        }
        await user.save();
        await friend.save();

        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath }) => {
                return { _id, firstName, lastName, occupation, location, picturePath };
            }
        );
        return res.status(200).json(formattedFriends);
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
};