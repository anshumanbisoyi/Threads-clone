// import {
//   FavoriteBorderOutlined,
//   FavoriteOutlined,
// } from "@mui/icons-material";
// import { Box, Divider, IconButton, Typography, useTheme } from "@mui/material";
// import FlexBetween from "components/FlexBetween";
// import Friend from "components/Friend";
// import WidgetWrapper from "components/WidgetWrapper";
// import { useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const PostWidget = ({
//   postId,
//   postUserId,
//   name,
//   description,
//   location,
//   picturePath,
//   userPicturePath,
//   likes,
//   comments,
// }) => {
//   const [isComments, setIsComments] = useState(false);
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.token);
//   const loggedInUserId = useSelector((state) => state.user._id);
//   const isLiked = Boolean(likes[loggedInUserId]);
//   const likeCount = Object.keys(likes).length;

//   const { palette } = useTheme();
//   const main = palette.neutral.main;
//   const primary = palette.primary.main;

//   const patchLike = async () => {
//     const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId: loggedInUserId }),
//     });
//     const updatedPost = await response.json();
//     dispatch(setPost({ post: updatedPost }));
//   };

//   return (
//     <WidgetWrapper m="2rem 0">
//       <Friend
//         friendId={postUserId}
//         name={name}
//         subtitle={location}
//         userPicturePath={userPicturePath}
//       />
//       <Typography color={main} sx={{ mt: "1rem" }}>
//         {description}
//       </Typography>
//       {picturePath && (
//         <img
//           width="100%"
//           height="auto"
//           alt="post"
//           style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
//           src={`http://localhost:3001/assets/${picturePath}`}
//         />
//       )}
//       <FlexBetween mt="0.25rem">
//         <FlexBetween gap="1rem">
//           <FlexBetween gap="0.3rem">
//             <IconButton onClick={patchLike}>
//               {isLiked ? (
//                 <FavoriteOutlined sx={{ color: primary }} />
//               ) : (
//                 <FavoriteBorderOutlined />
//               )}
//             </IconButton>
//             <Typography>{likeCount}</Typography>
//           </FlexBetween>
//         </FlexBetween>
//       </FlexBetween>
//     </WidgetWrapper>
//   );
// };

// export default PostWidget;


// import React, { useState } from "react";
// import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
// import { Box, Button, Divider, IconButton, Typography, useTheme } from "@mui/material";
// import FlexBetween from "components/FlexBetween";
// import Friend from "components/Friend";
// import WidgetWrapper from "components/WidgetWrapper";
// import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// const PostWidget = ({
//   postId,
//   postUserId,
//   name,
//   description,
//   location,
//   picturePath,
//   userPicturePath,
//   likes,
//   comments,
// }) => {
//   const [isComments, setIsComments] = useState(false);
//   const [showConfirmation, setShowConfirmation] = useState(false); // State for showing the confirmation popup
//   const [selectedPostId, setSelectedPostId] = useState(null); // State for storing the selected post ID
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.token);
//   const loggedInUserId = useSelector((state) => state.user._id);
//   const isLiked = Boolean(likes[loggedInUserId]);
//   const likeCount = Object.keys(likes).length;

//   const { palette } = useTheme();
//   const main = palette.neutral.main;
//   const primary = palette.primary.main;

//   const patchLike = async () => {
//     const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId: loggedInUserId }),
//     });
//     const updatedPost = await response.json();
//     dispatch(setPost({ post: updatedPost }));
//   };

//   const handleDeletePost = async () => {
//     // Close the confirmation popup
//     setShowConfirmation(false);

//     try {
//       const response = await fetch(
//         `http://localhost:3001/posts/${selectedPostId}`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete post.");
//       }

//       // Refresh the feed or perform any necessary actions after successful deletion
//       // For example, you can dispatch an action to update the posts in the Redux store
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleOpenConfirmation = (postId) => {
//     setSelectedPostId(postId); // Store the selected post ID in state
//     setShowConfirmation(true); // Show the confirmation popup
//   };

//   return (
//     <WidgetWrapper m="2rem 0">
//       {/* ... Existing code ... */}
//       <FlexBetween gap="1rem">
//         <FlexBetween gap="0.3rem">
//           <IconButton onClick={patchLike}>
//             {isLiked ? (
//               <FavoriteOutlined sx={{ color: primary }} />
//             ) : (
//               <FavoriteBorderOutlined />
//             )}
//           </IconButton>
//           <Typography>{likeCount}</Typography>
//         </FlexBetween>
//         {isOwnPost && (
//           <Box display="flex" gap="20px">
//             <EditIcon />
//             <DeleteIcon onClick={() => handleOpenConfirmation(postId)} />
//           </Box>
//         )}
//       </FlexBetween>

//       {/* Confirmation Popup */}
//       {showConfirmation && (
//         <Box
//           position="fixed"
//           top="0"
//           left="0"
//           width="100%"
//           height="100%"
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           backgroundColor="rgba(0, 0, 0, 0.5)"
//           zIndex="9999"
//         >
//           <Box
//             p="2rem"
//             backgroundColor="#fff"
//             borderRadius="8px"
//             boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
//           >
//             <Typography variant="h6">
//               Are you sure you want to delete this post?
//             </Typography>
//             <Box display="flex" justifyContent="flex-end" mt="1rem">
//               <Button
//                 variant="outlined"
//                 onClick={() => setShowConfirmation(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={handleDeletePost}
//               >
//                 Delete
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       )}
//     </WidgetWrapper>
//   );
// };

// export default PostWidget;

// import React, { useState } from "react";
// import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
// import {
//   Box,
//   Divider,
//   IconButton,
//   Typography,
//   useTheme,
//   Button,
// } from "@mui/material";
// import FlexBetween from "components/FlexBetween";
// import Friend from "components/Friend";
// import WidgetWrapper from "components/WidgetWrapper";
// import { useDispatch, useSelector } from "react-redux";
// import { setPost } from "state";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";
// import { useNavigate } from "react-router-dom";

// const PostWidget = ({
//   postId,
//   postUserId,
//   name,
//   description,
//   location,
//   picturePath,
//   userPicturePath,
//   likes,
//   comments,
// }) => {
//   const [showConfirmation, setShowConfirmation] = useState(false); // State for showing the confirmation popup
//   const [selectedPostId, setSelectedPostId] = useState(null); // State for storing the selected post ID
//   const dispatch = useDispatch();
//   const token = useSelector((state) => state.token);
//   const loggedInUserId = useSelector((state) => state.user._id);
//   const isLiked = Boolean(likes[loggedInUserId]);
//   const likeCount = Object.keys(likes).length;
//   const navigate = useNavigate();
//   const { palette } = useTheme();
//   const main = palette.neutral.main;
//   const primary = palette.primary.main;

//   const patchLike = async () => {
//     const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
//       method: "PATCH",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ userId: loggedInUserId }),
//     });
//     const updatedPost = await response.json();
//     dispatch(setPost({ post: updatedPost }));
//   };

//   const handleDeletePost = async () => {
//     // Close the confirmation popup
//     setShowConfirmation(false);

//     try {
//       console.log(selectedPostId);
//       const response = await fetch(
//         `http://localhost:3001/posts/${selectedPostId}/delete`,
//         {
//           method: "DELETE",
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (!response.ok) {
//         throw new Error("Failed to delete post.");
//       }
//       navigate(0);
//       // Refresh the feed or perform any necessary actions after successful deletion
//       // For example, you can dispatch an action to update the posts in the Redux store
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   const handleOpenConfirmation = (postId) => {
//     setSelectedPostId(postId); // Store the selected post ID in state
//     setShowConfirmation(true); // Show the confirmation popup
//   };

//   const isOwnPost = postUserId === loggedInUserId;

//   return (
//     <WidgetWrapper m="2rem 0">
//       <Friend
//         friendId={postUserId}
//         name={name}
//         subtitle={location}
//         userPicturePath={userPicturePath}
//       />
//       <Typography color={main} sx={{ mt: "1rem" }}>
//         {description}
//       </Typography>
//       {picturePath && (
//         <img
//           width="100%"
//           height="auto"
//           alt="post"
//           style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
//           src={`http://localhost:3001/assets/${picturePath}`}
//         />
//       )}
//       <FlexBetween mt="0.25rem">
//         <FlexBetween gap="1rem">
//           <FlexBetween gap="0.3rem">
//             <IconButton onClick={patchLike}>
//               {isLiked ? (
//                 <FavoriteOutlined sx={{ color: primary }} />
//               ) : (
//                 <FavoriteBorderOutlined />
//               )}
//             </IconButton>
//             <Typography>{likeCount}</Typography>
//           </FlexBetween>
//           {isOwnPost && (
//             <Box display="flex" gap="20px">
//               <EditIcon />
//               <DeleteIcon onClick={() => handleOpenConfirmation(postId)} />
//             </Box>
//           )}
//         </FlexBetween>
//       </FlexBetween>

//       {/* Confirmation Popup */}
//       {showConfirmation && (
//         <Box
//           position="fixed"
//           top="0"
//           left="0"
//           width="100%"
//           height="100%"
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           backgroundColor="rgba(0, 0, 0, 0.5)"
//           zIndex="9999"
//         >
//           <Box
//             p="2rem"
//             backgroundColor="#4D4D4D"
//             borderRadius="8px"
//             boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
//           >
//             <Typography variant="h6" color="white">
//               Are you sure you want to delete this post?
//             </Typography>
//             <Box display="flex" justifyContent="flex-end" mt="1rem" gap="10px">
//               <Button
//                 variant="outlined"
//                 onClick={() => setShowConfirmation(false)}
//               >
//                 Cancel
//               </Button>
//               <Button
//                 variant="contained"
//                 color="error"
//                 onClick={handleDeletePost}
//               >
//                 Delete
//               </Button>
//             </Box>
//           </Box>
//         </Box>
//       )}
//     </WidgetWrapper>
//   );
// };

// export default PostWidget;



import React, { useState } from "react";
import { FavoriteBorderOutlined, FavoriteOutlined } from "@mui/icons-material";
import {
  Box,
  Divider,
  IconButton,
  Typography,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import FlexBetween from "components/FlexBetween";
import Friend from "components/Friend";
import WidgetWrapper from "components/WidgetWrapper";
import { useDispatch, useSelector } from "react-redux";
import { setPost } from "state";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

const PostWidget = ({
  postId,
  postUserId,
  name,
  description,
  location,
  picturePath,
  userPicturePath,
  likes,
  comments,
}) => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPostId, setSelectedPostId] = useState(null);
  const [showEditPopup, setShowEditPopup] = useState(false); // State for showing the edit popup
  const [editedDescription, setEditedDescription] = useState(description);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.token);
  const loggedInUserId = useSelector((state) => state.user._id);
  const isLiked = Boolean(likes[loggedInUserId]);
  const likeCount = Object.keys(likes).length;
  const navigate = useNavigate();
  const { palette } = useTheme();
  const main = palette.neutral.main;
  const primary = palette.primary.main;

    const patchLike = async () => {
      const response = await fetch(`http://localhost:3001/posts/${postId}/like`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: loggedInUserId }),
      });
      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    };

  const handleDeletePost = async () => {
    // Close the confirmation popup
    setShowConfirmation(false);

    try {
      console.log(selectedPostId);
      const response = await fetch(
        `http://localhost:3001/posts/${selectedPostId}/delete`,
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
      navigate(0);
      // Refresh the feed or perform any necessary actions after successful deletion
      // For example, you can dispatch an action to update the posts in the Redux store
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenConfirmation = (postId) => {
    setSelectedPostId(postId); // Store the selected post ID in state
    setShowConfirmation(true); // Show the confirmation popup
  };

  const handleEditPost = async () => {
    setShowEditPopup(false);

    try {
      const response = await fetch(`http://localhost:3001/posts/${postId}/edit`, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ description: editedDescription }),
      });

      if (!response.ok) {
        throw new Error("Failed to edit post.");
      }

      const updatedPost = await response.json();
      dispatch(setPost({ post: updatedPost }));
    } catch (error) {
      console.error(error);
    }
  };

  const isOwnPost = postUserId === loggedInUserId;

  return (
    <WidgetWrapper m="2rem 0">
      <Friend
        friendId={postUserId}
        name={name}
        subtitle={location}
        userPicturePath={userPicturePath}
      />
      <Typography color={main} sx={{ mt: "1rem" }}>
        {description}
      </Typography>
      {picturePath && (
        <img
          width="100%"
          height="auto"
          alt="post"
          style={{ borderRadius: "0.75rem", marginTop: "0.75rem" }}
          src={`http://localhost:3001/assets/${picturePath}`}
        />
      )}
      <FlexBetween mt="0.25rem">
        <FlexBetween gap="1rem">
          <FlexBetween gap="0.3rem">
            <IconButton onClick={patchLike}>
              {isLiked ? (
                <FavoriteOutlined sx={{ color: primary }} />
              ) : (
                <FavoriteBorderOutlined />
              )}
            </IconButton>
            <Typography>{likeCount}</Typography>
          </FlexBetween>
          {isOwnPost && (
            <Box display="flex" gap="20px">
              <EditIcon onClick={() => setShowEditPopup(true)} />
              <DeleteIcon onClick={() => handleOpenConfirmation(postId)} />
            </Box>
          )}
        </FlexBetween>
      </FlexBetween>

      {/* Edit Popup */}
      {showEditPopup && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          zIndex="9999"
        >
          <Box
            p="2rem"
            backgroundColor="#4D4D4D"
            borderRadius="8px"
            boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
          >
            <Typography variant="h6" color="white">
              Edit Post
            </Typography>
            <TextField
              multiline
              variant="outlined"
              fullWidth
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
              sx={{ mt: "2rem" }}
            />
            <Box display="flex" justifyContent="flex-end" mt="1rem" gap="10px">
              <Button
                variant="outlined"
                onClick={() => setShowEditPopup(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleEditPost}
              >
                Save
              </Button>
            </Box>
          </Box>
        </Box>
      )}

      {/* Confirmation Popup */}
      {showConfirmation && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100%"
          height="100%"
          display="flex"
          justifyContent="center"
          alignItems="center"
          backgroundColor="rgba(0, 0, 0, 0.5)"
          zIndex="9999"
        >
          <Box
            p="2rem"
            backgroundColor="#4D4D4D"
            borderRadius="8px"
            boxShadow="0px 2px 5px rgba(0, 0, 0, 0.2)"
          >
            <Typography variant="h6" color="white">
              Are you sure you want to delete this post?
            </Typography>
            <Box display="flex" justifyContent="flex-end" mt="1rem" gap="10px">
              <Button
                variant="outlined"
                onClick={() => setShowConfirmation(false)}
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={handleDeletePost}
              >
                Delete
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </WidgetWrapper>
  );
};

export default PostWidget;