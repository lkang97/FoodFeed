import React, { useContext, useState, useEffect } from "react";
import { Redirect } from "react-router-dom";

import { UserContext } from "../UserContext";
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
        console.log(posts);
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
            <div>
              <MainFeedPost key={post.id} post={post} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainFeed;
