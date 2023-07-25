// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setFriends } from "state";
// import FlexBetween from "./FlexBetween";
// import UserImage from "./UserImage";

// const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { _id } = useSelector((state) => state.user);
//   const token = useSelector((state) => state.token);
//   const friends = useSelector((state) => state.user.friends);
//   // console.log(friends);
//   const { palette } = useTheme();
//   const primaryLight = palette.primary.light;
//   const primaryDark = palette.primary.dark;
//   const main = palette.neutral.main;
//   const medium = palette.neutral.medium;

//   const isFriend = friends.find((friend) => friend._id === friendId);

//   const patchFriend = async () => {
//     const response = await fetch(
//       `https://threads-clone-api.vercel.app/users/${_id}/${friendId}`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data = await response.json();
//     dispatch(setFriends({ friends: data }));
//   };

//   return (
//     <FlexBetween>
//       <FlexBetween gap="1rem">
//         <UserImage image={userPicturePath} size="55px" />
//         <Box
//           onClick={() => {
//             navigate(`/profile/${friendId}`);
//             navigate(0);
//           }}
//         >
//           <Typography
//             color={main}
//             variant="h5"
//             fontWeight="500"
//             sx={{
//               "&:hover": {
//                 color: palette.primary.light,
//                 cursor: "pointer",
//               },
//             }}
//           >
//             {name}
//           </Typography>
//           <Typography color={medium} fontSize="0.75rem">
//             {subtitle}
//           </Typography>
//         </Box>
//       </FlexBetween>
//       <IconButton
//         onClick={() => patchFriend()}
//         sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
//       >
//         {isFriend ? (
//           <PersonRemoveOutlined sx={{ color: primaryDark }} />
//         ) : (
//           <PersonAddOutlined sx={{ color: primaryDark }} />
//         )}
//       </IconButton>
//     </FlexBetween>
//   );
// };

// export default Friend;


// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useNavigate } from "react-router-dom";
// import { setFriends } from "state";
// import FlexBetween from "./FlexBetween";
// import UserImage from "./UserImage";

// const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { _id } = useSelector((state) => state.user);
//   const token = useSelector((state) => state.token);
//   const friends = useSelector((state) => state.user.friends);
//   const { palette } = useTheme();
//   const primaryLight = palette.primary.light;
//   const primaryDark = palette.primary.dark;
//   const main = palette.neutral.main;
//   const medium = palette.neutral.medium;

//   // Ensure 'friends' is an array before using 'find'
//   const isFriend =
//     Array.isArray(friends) && friends.find((friend) => friend._id === friendId);

//   const patchFriend = async () => {
//     try {
//       const response = await fetch(
//         `https://threads-clone-api.vercel.app/users/${_id}/${friendId}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update friend status.");
//       }

//       const data = await response.json();
//       dispatch(setFriends({ friends: data }));
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const isOwnPost = friendId === _id;
//   return (
//     <FlexBetween>
//       <FlexBetween gap="1rem">
//         {/* <UserImage image={userPicturePath} size="55px" /> */}
//         <Box
//           onClick={() => {
//             navigate(`/profile/${friendId}`);
//             navigate(0);
//           }}
//         >
//           <Typography
//             color={main}
//             variant="h5"
//             fontWeight="500"
//             sx={{
//               "&:hover": {
//                 color: palette.primary.light,
//                 cursor: "pointer",
//               },
//             }}
//           >
//             {name}
//           </Typography>
//           <Typography color={medium} fontSize="0.75rem">
//             {subtitle}
//           </Typography>
//         </Box>
//       </FlexBetween>
//       {isOwnPost && (
//         <>
//           <EditIcon />
//           <DeleteIcon />
//         </>
//       )}

//       <IconButton
//         onClick={() => patchFriend()}
//         sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
//       >
//         {isFriend ? (
//           <PersonRemoveOutlined sx={{ color: primaryDark }} />
//         ) : (
//           <PersonAddOutlined sx={{ color: primaryDark }} />
//         )}
//       </IconButton>
//     </FlexBetween>
//   );
// };

// export default Friend;

// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// import { setFriends } from "state";
// import FlexBetween from "./FlexBetween";
// import UserImage from "./UserImage";

// const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { _id } = useSelector((state) => state.user);
//   const token = useSelector((state) => state.token);
//   const friends = useSelector((state) => state.user.friends);

//   const { palette } = useTheme();
//   const primaryLight = palette.primary.light;
//   const primaryDark = palette.primary.dark;
//   const main = palette.neutral.main;
//   const medium = palette.neutral.medium;

//   const isFriend = friends.find((friend) => friend._id === friendId);

//   const patchFriend = async () => {
//     const response = await fetch(
//       `https://threads-clone-api.vercel.app/users/${_id}/${friendId}`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       }
//     );
//     const data = await response.json();
//     dispatch(setFriends({ friends: data }));
//   };

//   return (
//     <FlexBetween>
//       <FlexBetween gap="1rem">
//         <UserImage image={userPicturePath} size="55px" />
//         <Box
//           onClick={() => {
//             navigate(`/profile/${friendId}`);
//             navigate(0);
//           }}
//         >
//           <Typography
//             color={main}
//             variant="h5"
//             fontWeight="500"
//             sx={{
//               "&:hover": {
//                 color: palette.primary.light,
//                 cursor: "pointer",
//               },
//             }}
//           >
//             {name}
//           </Typography>
//           <Typography color={medium} fontSize="0.75rem">
//             {subtitle}
//           </Typography>
//         </Box>
//       </FlexBetween>
//       <IconButton
//         onClick={() => patchFriend()}
//         sx={{ backgroundColor: primaryLight, p: "0.6rem" }}
//       >
//         {isFriend ? (
//           <PersonRemoveOutlined sx={{ color: primaryDark }} />
//         ) : (
//           <PersonAddOutlined sx={{ color: primaryDark }} />
//         )}
//       </IconButton>
//     </FlexBetween>
//   );
// };

// export default Friend;

// import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
// import { Box, IconButton, Typography, useTheme } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// 

// import { setFriends } from "state";
// import FlexBetween from "./FlexBetween";
// import UserImage from "./UserImage";
// import { useState } from "react";

// const Friend = ({ friendId, name, subtitle, userPicturePath }) => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const { _id } = useSelector((state) => state.user);
//   const token = useSelector((state) => state.token);
//   const friends = useSelector((state) => state.user.friends);
//   const { palette } = useTheme();
//   const primaryLight = palette.primary.light;
//   const primaryDark = palette.primary.dark;
//   const main = palette.neutral.main;
//   const medium = palette.neutral.medium;
//   const [showConfirmation, setShowConfirmation] = useState(false);


//   // Ensure 'friends' is an array before using 'find'
//   const isFriend =
//     Array.isArray(friends) && friends.find((friend) => friend._id === friendId);

//   const patchFriend = async () => {
//     try {
//       const response = await fetch(
//         `https://threads-clone-api.vercel.app/users/${_id}/${friendId}`,
//         {
//           method: "PATCH",
//           headers: {
//             Authorization: `Bearer ${token}`,
//             "Content-Type": "application/json",
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to update friend status.");
//       }

//       const data = await response.json();
//       dispatch(setFriends({ friends: data }));
//     } catch (error) {
//       console.error(error);
//     }
//   };
//   const isOwnPost = friendId === _id;

//     const handleDeletePost = async () => {
//       // Close the confirmation popup
//       setShowConfirmation(false);

//       try {
//         console.log(_id);
//         const response = await fetch(
//           `https://threads-clone-api.vercel.app/posts/${_id}/delete`,
//           {
//             method: "DELETE",
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (!response.ok) {
//           throw new Error("Failed to delete post.");
//         }

//         // Refresh the feed or perform any necessary actions after successful deletion
//         // For example, you can dispatch an action to update the posts in the Redux store
//       } catch (error) {
//         console.error(error);
//       }
//     };

//   return (
//     <FlexBetween>
//       <FlexBetween gap="1rem">
//         {/* <UserImage image={userPicturePath} size="55px" /> */}
//         <Box
//           onClick={() => {
//             navigate(`/profile/${friendId}`);
//             navigate(0);
//           }}
//         >
//           <Typography
//             color={main}
//             variant="h5"
//             fontWeight="500"
//             sx={{
//               "&:hover": {
//                 color: palette.primary.light,
//                 cursor: "pointer",
//               },
//             }}
//           >
//             {name}
//           </Typography>
//           <Typography color={medium} fontSize="0.75rem">
//             {subtitle}
//           </Typography>
//         </Box>
//       </FlexBetween>

//       {/* Conditionally render the Edit and Delete icons */}
//       {isOwnPost ? (
//         <Box display="flex" gap="20px">
//           <EditIcon />
//           <DeleteIcon onClick={() => setShowConfirmation(true)} />
//           {/* Confirmation Popup */}
//           {showConfirmation && (
//             <div className="confirmation-popup">
//               <p>Are you sure you want to delete this post?</p>
//               <button onClick={handleDeletePost}>Yes</button>
//               <button onClick={() => setShowConfirmation(false)}>No</button>
//             </div>
//           )}
//         </Box>
//       ) : (
//         <IconButton
//           onClick={() => patchFriend()}
//           sx={{
//             backgroundColor: primaryLight,
//             p: "0.6rem",
//             marginLeft: "auto",
//             display: "flex",
//             gap: "4px",
//           }}
//         >
//           {isFriend ? (
//             <PersonRemoveOutlined sx={{ color: primaryDark }} />
//           ) : (
//             <PersonAddOutlined sx={{ color: primaryDark }} />
//           )}
//         </IconButton>
//       )}
//     </FlexBetween>
//   );
// };

// export default Friend;



import React, { useState } from "react";
import { PersonAddOutlined, PersonRemoveOutlined } from "@mui/icons-material";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setFriends } from "state";
import FlexBetween from "./FlexBetween";
import UserImage from "./UserImage";

const Friend = ({ friendId, postId, name, subtitle, userPicturePath }) => {
  const dispatch = useDispatch();
  const { _id } = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const friends = useSelector((state) => state.user.friends);
  const { palette } = useTheme();
  const primaryLight = palette.primary.light;
  const primaryDark = palette.primary.dark;
  const main = palette.neutral.main;
  const medium = palette.neutral.medium;
  const navigate = useNavigate();

  // Ensure 'friends' is an array before using 'find'
  const isFriend =
    Array.isArray(friends) && friends.find((friend) => friend._id === friendId);

  const patchFriend = async () => {
    // Your existing patchFriend logic here
    try {
      const response = await fetch(
        `https://threads-clone-api.vercel.app/users/${_id}/${friendId}`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to update friend status.");
      }

      const data = await response.json();
      dispatch(setFriends({ friends: data }));
    } catch (error) {
      console.error(error);
    }
  };

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeletePost = async () => {
    setShowConfirmation(false);

    try {
      const response = await fetch(
        `https://threads-clone-api.vercel.app/posts/${postId}/delete`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Failed to delete post.");
      }

      // Refresh the feed or perform any necessary actions after successful deletion
      // For example, you can dispatch an action to update the posts in the Redux store
    } catch (error) {
      console.error(error);
    }
  };

  const isOwnPost = friendId === _id;

  return (
    <FlexBetween>
      <FlexBetween gap="1rem">
        <UserImage image={userPicturePath} size="55px" />
        <Box
          onClick={() => {
            navigate(`/profile/${friendId}`);
            navigate(0);
          }}
        >
          <Typography
            color={main}
            variant="h5"
            fontWeight="500"
            sx={{
              "&:hover": {
                color: palette.primary.light,
                cursor: "pointer",
              },
            }}
          >
            {name}
          </Typography>
          <Typography color={medium} fontSize="0.75rem">
            {subtitle}
          </Typography>
        </Box>
      </FlexBetween>

      {/* Conditionally render the Edit and Delete icons */}
      {isOwnPost ? (
        <Box display="flex" gap="20px">
          {/* <EditIcon />
          <DeleteIcon onClick={() => setShowConfirmation(true)} /> */}
        </Box>
      ) : (
        <IconButton
          onClick={() => patchFriend()}
          sx={{
            backgroundColor: primaryLight,
            p: "0.6rem",
            marginLeft: "auto",
            display: "flex",
            gap: "4px",
          }}
        >
          {isFriend ? (
            <PersonRemoveOutlined sx={{ color: primaryDark }} />
          ) : (
            <PersonAddOutlined sx={{ color: primaryDark }} />
          )}
        </IconButton>
      )}
      {showConfirmation && (
        <Box>
          <Typography>Are you sure you want to delete this post?</Typography>
          <Box>
            <button onClick={handleDeletePost}>Yes</button>
            <button onClick={() => setShowConfirmation(false)}>No</button>
          </Box>
        </Box>
      )}
    </FlexBetween>
  );
};

export default Friend;





