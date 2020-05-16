import React, { useState, useEffect } from "react";

// import { UserContext } from "../UserContext";
import { apiBaseUrl } from "../config";
import NavBar from "./NavBar";
import MainFeedPost from "./MainFeedPost";

const MainFeed = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getAllPosts = async () => {
      const response = await fetch(`${apiBaseUrl}/posts`);
      if (response.ok) {
        const { posts } = await response.json();
        setPosts(posts);
      }
    };
    getAllPosts();
  }, []);

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
