import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import PostWidget from "./PostWidget";
import { setPosts, setTotalPages } from "state";

const PostsWidget = ({ userId, isProfile = false }) => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts);
  const token = useSelector((state) => state.token);
  const [page, setPage] = useState(1);

  const [hasMore, setHasMore] = useState(true);
  //   const [totalPages, setTotalPages] = useState(0);
  const totalPages = useSelector((state) => state.totalPages);
  const [currentData, setCurrentData] = useState([]);

  const getPosts = async () => {
    console.log("FETCHING DATA");
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/posts?page=${page}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let data = await response.json();

    const modifiedData = sliceAdapter(data, page);
    dispatch(setTotalPages({ totalPages: modifiedData.no_of_pages }));
    // setCurrentData((state) => [...state, ...modifiedData.data]);
    dispatch(setPosts({ posts: [...posts, ...modifiedData.data] }));
  };

  const getUserPosts = async (userId) => {
    const response = await fetch(
      `${process.env.REACT_APP_BASE_URL}/api/posts/${userId}/posts?page=${page}`,
      {
        method: "GET",
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    let data = await response.json();

    const modifiedData = sliceAdapter(data, page);
    dispatch(setTotalPages({ totalPages: modifiedData.no_of_pages }));
    // setCurrentData((state) => [...state, ...modifiedData.data]);
    dispatch(setPosts({ posts: modifiedData.data }));
  };

  useEffect(() => {
    if (isProfile) {
      getUserPosts(userId);
    } else {
      getPosts();
    }
  }, [userId, page, token]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    console.log("CHECKING DATA");
    if (page === totalPages) {
      setHasMore(false);
    }
  }, [currentData, page, totalPages]);

  const sliceAdapter = (data, page) => {
    console.log("SLICING DATA");
    const slicedData = data
      .reverse()
      .slice((page - 1) * 5, Math.min((page - 1) * 5 + 5, data.length));

    return {
      no_of_pages: Math.ceil(data.length / 5),
      data: slicedData,
      current_page: page,
    };
  };

  const fetchMoreData = () => {
    console.log("FETCHING MORE DATA");
    setPage((state) => state + 1);
  };

  useEffect(() => console.log("POSTS:", posts), [posts]);

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<div style={{ textAlign: "center" }}>Loading...</div>}
        endMessage={<p style={{ textAlign: "center" }}>You are all set.</p>}
      >
        {posts.map(
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
    </>
  );
};

export default PostsWidget;
