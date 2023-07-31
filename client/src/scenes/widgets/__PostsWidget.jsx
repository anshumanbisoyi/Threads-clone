// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "state";
// import PostWidget from "./PostWidget";

// const PostsWidget = ({ userId, isProfile = false }) => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts);
//   const token = useSelector((state) => state.token);

//   const getPosts = async () => {
//     const response = await fetch(`${process.env.REACT_APP_BASE_URL}/api/posts`, {
//       method: "GET",
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     const data = await response.json();
//     dispatch(setPosts({ posts: data }));
//   };

//   const getUserPosts = async () => {
//     const response = await fetch(
//       `${process.env.REACT_APP_BASE_URL}/api/posts/${userId}/posts`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const data = await response.json();
//     dispatch(setPosts({ posts: data }));
//   };

//   useEffect(() => {
//     if (isProfile) {
//       getUserPosts();
//     } else {
//       getPosts();
//     }
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // Check if posts is an array before using .map()
//   if (!Array.isArray(posts)) {
//     return <div>Loading...</div>;
//   }
//  const reversedPosts = [...posts].reverse();
//   return (
//     <>
//       {reversedPosts.map(
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
//             key={_id}
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
//   );
// };

// export default PostsWidget;

// import React, { useEffect, useState } from "react"; // Make sure to import useState
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "state";
// import PostWidget from "./PostWidget";

// const PostsWidget = ({ userId, isProfile = false }) => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts);
//   const token = useSelector((state) => state.token);
//   const [currentPage, setCurrentPage] = useState(1); // Step 1: State variable for current page

//   const getPosts = async () => {
//     // Fetch posts for the specified page
//     const response = await fetch(
//       `${process.env.REACT_APP_BASE_URL}/api/posts?page=${currentPage}`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const data = await response.json();
//     console.log(data);
//     dispatch(setPosts({ posts: [...posts, ...data] }));
//   };

//   const getUserPosts = async () => {
//     const response = await fetch(
//       `${process.env.REACT_APP_BASE_URL}/api/posts/${userId}/posts?page=${currentPage}`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const data = await response.json();
//     dispatch(setPosts({ posts: [...posts, ...data] }));
//   };

//   useEffect(() => {
//     if (isProfile) {
//       getUserPosts();
//     } else {
//       getPosts();
//     }
//   }, [currentPage]); // Step 2: Add currentPage as a dependency to the useEffect

//   useEffect(() => {
//     // Step 3: Add scroll event listener to the window
//     const handleScroll = () => {
//       const isScrolledToBottom =
//         window.innerHeight + document.documentElement.scrollTop ===
//         document.documentElement.offsetHeight;
//       if (isScrolledToBottom) {
//         setCurrentPage((prevPage) => prevPage + 1); // Load more posts when scrolled to bottom
//       }
//     };
//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll); // Clean up the event listener
//     };
//   }, []); // Step 3: Empty dependency array to only add the event listener once

//   // Check if posts is an array before using .map()
//   if (!Array.isArray(posts)) {
//     return <div>Loading...</div>;
//   }

//   const reversedPosts = [...posts].reverse();
//   return (
//     <>
//       {reversedPosts.slice(0,5).map(
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
//             key={_id}
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
//   );
// };

// export default PostsWidget;

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setPosts } from "state";
import PostWidget from "./PostWidget";
import InfiniteScroll from "react-infinite-scroll-component";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);

  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [totalData, setTotalData] = useState([]);
  const [currentData, setCurrentData] = useState([]);

  const getPosts = async (page) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/posts?page=${page}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let data = await response.json();
    console.log("RESPONSE DATA: ", data);
    setTotalData(data);
  };

  useEffect(() => {
    setCurrentData(totalData.slice(0, Math.min(5, totalData.length)));
  }, [totalData]);

  const fetchMoreData = () => {
    // let temp = [...data];
    // data = data.slice(page * 5, Math.min(page * 5 + 5, temp.length));
    // console.log(page);
    // setHasMore(false);
    // setHasMore(data.length > 0);
    // console.log("SLICED DATA:", data);
    // if (data.length === 0) {
    //   data = temp;
    // }
    console.log("Fetching more data...");

    setCurrentData(
      totalData.slice(
        (page + 1) * 5,
        Math.min((page + 1) * 5 + 5, totalData.length)
      )
    );
    // dispatch(setPosts({ posts: currentData }));
    setPage((state) => state + 1);
  };

  useEffect(() => {
    console.log("Current Data: ", currentData);
  }, [currentData]);

  useEffect(() => {
    console.log("Page: ", page);
  }, [page]);

  useEffect(() => {
    console.log(hasMore);
  }, [hasMore]);

  useEffect(() => {
    setHasMore(page * 5 < totalData.length);
  }, [page, totalData]);

  const getUserPosts = async (userId, page) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/posts/${userId}/posts?page=${page}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let data = await response.json();
    // console.log(data);
    let temp = data;
    data = data.slice(page * 5, Math.min(page * 5 + 5, temp.length));
    setHasMore(data.length > 0);
    if (data.length === 0) {
      data = temp;
    }
    dispatch(setPosts({ posts: data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts(userId);
    } else {
      getPosts();
    }
  }, [userId]); // eslint-disable-line react-hooks/exhaustive-deps

  // if (Array.isArray(posts) ? posts.length === 0 : true) {
  //   return <div>Loading...</div>;
  // }

  // const reversedPosts = [...posts];

  // Function to load more posts
  // const fetchMoreData = () => {
  //   if (isProfile) {
  //     getUserPosts(userId, page + 1);
  //   } else {
  //     getPosts(page + 1);
  //   }
  //   console.log("fetchmore data");

  //   setPage(page + 1);
  // };

  return (
    <InfiniteScroll
      dataLength={currentData.length}
      next={fetchMoreData}
      hasMore={true}
      loader={<div style={{ textAlign: "center" }}>Loading...</div>}
      endMessage={<p style={{ textAlign: "center" }}>You are all set.</p>}
    >
      {/* {console.log("Current Data: ", currentData)} */}
      {currentData.map(
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
    </InfiniteScroll>
  );
};

export default PostsWidget;

// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { setPosts } from "state";
// import PostWidget from "./PostWidget";
// import InfiniteScroll from "react-infinite-scroll-component";

// const PostsWidget = ({ userId, isProfile = false }) => {
//   const dispatch = useDispatch();
//   const posts = useSelector((state) => state.posts);
//   const token = useSelector((state) => state.token);

//   console.log(posts.length);

//   const getPosts = async () => {
//     const response = await fetch(
//       `${process.env.REACT_APP_BASE_URL}/api/posts`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const data = await response.json();
//     dispatch(setPosts({ posts: data }));
//   };

//   const getUserPosts = async () => {
//     const response = await fetch(
//       `${process.env.REACT_APP_BASE_URL}/api/posts/${userId}/posts`,
//       {
//         method: "GET",
//         headers: { Authorization: `Bearer ${token}` },
//       }
//     );
//     const data = await response.json();
//     dispatch(setPosts({ posts: data }));
//   };

//   useEffect(() => {
//     if (isProfile) {
//       getUserPosts();
//     } else {
//       getPosts();
//     }
//   }, []); // eslint-disable-line react-hooks/exhaustive-deps

//   // Check if posts is an array before using .map()
//   if (!Array.isArray(posts)) {
//     return <div>Loading...</div>;
//   }
//   const reversedPosts = [...posts].reverse();

//     const fetchMoreData = () => {

//     setTimeout(() => {
//       setPosts(reversedPosts.concat(Array.from({ length: 5 })));
//     },1000);
//     };

//   return (
//     <InfiniteScroll
//       dataLength={reversedPosts.length}
//       next={fetchMoreData}
//       hasMore={false}
//       loader={<div style={{ textAlign: "center" }}>Loading...</div>}
//       endMessage={<p style={{ textAlign: "center" }}>You are all set.</p>}
//     >
//       {reversedPosts.map(
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
//             key={_id}
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
//     </InfiniteScroll>
//   );
// };

// export default PostsWidget;
