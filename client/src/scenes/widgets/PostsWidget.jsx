// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setPosts } from 'state';
// import PostWidget from './PostWidget';


// const PostsWidget = ({ userId, isProfile = false }) => {
//     const dispatch = useDispatch();
//     const posts = useSelector((state) => state.posts);
//     const token  = useSelector((state) => state.token)

//     const getPosts = async() =>{
//         try {
//             const res = await fetch(`http://localhost:7000/posts`,
//                 {
//                     method:"GET",
//                     headers:{ Authorization : `Bearer ${token}`}
//                 }
//             )
//             const data = await res.json();
//             console.log("getPosts DATA  :",data)
//             dispatch(setPosts({ posts : data}));
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const getUserPosts = async() =>{
//         try {
//             const res = await fetch(`http://localhost:7000/${userId}/posts`,
//                 {
//                     method:"GET",
//                     headers: { Authorization : `Bearer ${token}`}
//                 }
//             );
    
//             const data = res.json();
//             console.log("getUserPosts DATA :",data)

//             dispatch(setPosts({ posts : data }));
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     useEffect(()=>{
//         if(isProfile) {
//             getUserPosts();
//         } else {
//             getPosts();
//         }
//     },[]);

//   return (
//     <>
//       {posts &&  posts?.map(
//         ({
//           _id,
//           userId,
//           firstName,
//           lastName,
//           description,
//           location,
//           picturePath,
//           userPicturePath,
//           likes,
//           comments,
//         }) => (
//           <PostWidget
//             key={_id }
//             postId={_id}
//             postUserId={userId}
//             name={`${firstName} ${lastName}`}
//             description={description}
//             location={location}
//             picturePath={picturePath}
//             userPicturePath={userPicturePath}
//             likes={likes}
//             comments={comments}
//           />
//         )
//       )}
//     </>
//   )
// }

// export default PostsWidget


import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const getPosts = async () => {
    const response = await fetch("http://localhost:7000/posts", {
      method: "GET",
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  const getUserPosts = async () => {
    const response = await fetch(
      `http://localhost:7000/posts/${userId}/posts`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const data = await response.json();
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts();
    } else {
      getPosts();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      {posts?.map(
        ({
          _id,
          userId,
          firstName,
          lastName,
          description,
          location,
          picturePath,
          userPicturePath,
          likes,
          comments,
        }) => (
          <PostWidget
            key={_id}
            postId={_id}
            postUserId={userId}
            name={`${firstName} ${lastName}`}
            description={description}
            location={location}
            picturePath={picturePath}
            userPicturePath={userPicturePath}
            likes={likes}
            comments={comments}
          />
        )
      )}
    </>
  );
};

export default PostsWidget;