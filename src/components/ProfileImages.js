import React, { useState, useEffect, useContext } from "react";
import { apiBaseUrl } from "../config";
import ProfileImageCard from "./ProfileImageCard";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

const useStyles = makeStyles((theme) => ({
  imagesContainer: {
    width: 1000,
    flexDirection: "row-wrap",
    justifySelf: "center",
    justifyContent: "center",
    paddingTop: 40,
    borderTop: "1px solid lightgray",
  },
  gridTiles: {
    justifyContent: "center",
  },
}));

const ProfileImages = () => {
  const { authToken } = useContext(UserContext);
  const classes = useStyles();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const getUserPosts = async (id) => {
      const response = await fetch(`${apiBaseUrl}/users/${id}/posts`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.ok) {
        const { posts } = await response.json();
        setPosts(posts);
        console.log(posts);
      }
    };

    getUserPosts(id);
  }, [id, authToken]);
  return (
    <div className={classes.imagesContainer}>
      <GridList cellHeight={330} cols={3}>
        {posts.map((post) => {
          return (
            <GridListTile className={classes.gridTiles} key={post.id}>
              <ProfileImageCard
                key={post.id}
                imageUrl={post.imageUrl}
                postId={post.id}
              />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

export default ProfileImages;
