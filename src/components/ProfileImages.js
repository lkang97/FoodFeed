import React, { useState, useEffect } from "react";
import { apiBaseUrl } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import { useParams } from "react-router-dom";

const ProfileImages = () => {
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async (id) => {
      const response = await fetch(`${apiBaseUrl}/users/${id}/posts`);
      if (response.ok) {
        const { posts } = await response.json();
        setPosts(posts);
        console.log(posts);
      }
    };

    getUserPosts(id);
  }, []);
  return (
    // <Grid
    //   container
    //   spacing={3}
    //   justify="center"
    //   direction="row-reverse"
    //   alignItems="center"
    // ></Grid>
    <div>
      {posts.map((post) => {
        return <img key={post.id} src={post.imageUrl} alt="post" />;
      })}
    </div>
  );
};

export default ProfileImages;
