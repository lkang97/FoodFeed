import React, { useState, useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { CardContent } from "@material-ui/core";
import { apiBaseUrl } from "../config";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { UserContext } from "../UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    display: "flex",
    flexDirection: "column",
    justifySelf: "center",
  },
  media: {
    height: 500,
    width: 500,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 45,
    alignItems: "center",
  },
  avatar: {
    height: 30,
    width: 30,
  },
  username: {
    paddingLeft: 15,
    fontWeight: "bold",
    fontSize: 14,
  },
  postContainer: {
    paddingTop: 30,
  },
  likesContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  notLiked: {
    color: "black",
  },
  liked: {
    color: "red",
  },
}));

const MainFeedPost = (props) => {
  const classes = useStyles();
  const postId = props.post.id;
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const { userId } = useContext(UserContext);

  useEffect(() => {
    const getLikes = async () => {
      const response = await fetch(`${apiBaseUrl}/posts/${postId}/likes`);
      if (response.ok) {
        const { userIds } = await response.json();
        setLikes(userIds.length);
        if (userIds.includes(Number(userId))) {
          setLiked(true);
        } else {
          setLiked(false);
        }
      }
    };
    getLikes();
  }, [liked, userId, postId]);

  const handleLike = async () => {
    if (!liked) {
      const response = await fetch(`${apiBaseUrl}/posts/${postId}/likes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        setLiked(true);
      }
    } else {
      const response = await fetch(`${apiBaseUrl}/posts/${postId}/likes`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId }),
      });

      if (response.status === 204) {
        setLiked(false);
      }
    }
  };

  return (
    <div className={classes.postContainer}>
      <Card className={classes.root}>
        <CardContent className={classes.userInfo}>
          <Avatar className={classes.avatar} src={props.post.User.imageUrl} />
          <div className={classes.username}>{props.post.User.username}</div>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={props.post.imageUrl}
        ></CardMedia>

        <CardContent>
          <div className={classes.likesContainer}>
            <IconButton onClick={handleLike}>
              {liked ? (
                <FavoriteIcon className={classes.liked} />
              ) : (
                <FavoriteBorderIcon className={classes.notLiked} />
              )}
            </IconButton>
            {likes === 1 ? <div>1 like</div> : <div>{likes} likes</div>}
          </div>
          <div></div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MainFeedPost;
