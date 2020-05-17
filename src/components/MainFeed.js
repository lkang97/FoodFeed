import React, { useState, useEffect, useContext } from "react";

// import { UserContext } from "../UserContext";
import { apiBaseUrl } from "../config";
import NavBar from "./NavBar";
import MainFeedPost from "./MainFeedPost";
import { UserContext } from "../UserContext";

const MainFeed = () => {
  const { authToken } = useContext(UserContext);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch(`${apiBaseUrl}/posts`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.ok) {
        const { posts } = await response.json();
        setPosts(posts);
      }
    };
    getAllPosts();
  }, [authToken]);

  return (
    <div>
      <NavBar />
      <div>
        {posts.map((post) => {
          return (
            <div key={post.id}>
              <MainFeedPost post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainFeed;
