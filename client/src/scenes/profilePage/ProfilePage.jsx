import { Box, useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Navbar from "scenes/navbar/Navbar";
import FriendListWidget from "scenes/widgets/FriendListWidget";
import MyPostWidgets from "scenes/widgets/MyPostWidgets";
import PostsWidget from "scenes/widgets/PostsWidget";
import UserWidgets from "scenes/widgets/UserWidgets";


const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const {uid}  = useParams();
  const token = useSelector((state) => state.token);
  const isNonMobileScreens = useMediaQuery("(min-width:1000px)");


  const getUser = async () => {
    const response = await fetch(`${process.env.REACT_APP_BASE_URL}/users/${uid}`, {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    setUser(data);
  };

  useEffect(() => {
    getUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!user) return null;

  return (
    <Box>
      <Navbar/>
      <Box
        width="100%"
        padding="2rem 6%"
        display={isNonMobileScreens ? "flex" : "block"}
        gap="2rem"
        justifyContent="center"
      >
        <Box flexBasis={isNonMobileScreens ? "26%" : undefined}>
          <UserWidgets userId={uid} picturePath={user.picturePath} />

          <Box m="2rem 0" />
          {/* <FriendListWidget userId={userId} /> */}
          <FriendListWidget userId={uid}/>
        </Box>
        <Box
          flexBasis={isNonMobileScreens ? "42%" : undefined}
          mt={isNonMobileScreens ? undefined : "2rem"}
        >
          {/* <MyPostWidget picturePath={user.picturePath} /> */}
          <MyPostWidgets picturePath={user.picturePath} />
          <Box m="2rem 0" />
          {/* <PostsWidget userId={userId} isProfile /> */}
          <PostsWidget userId={uid} isProfile />
        </Box>
      </Box>
    </Box>
  );
};

export default ProfilePage;