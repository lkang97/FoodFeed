import React, { useState, useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import { CardContent } from "@material-ui/core";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { UserContext } from "../UserContext";
import { apiBaseUrl } from "../config";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  modalImage: {
    height: 600,
    width: 600,
  },
  modalContainer: {
    display: "flex",
    maxWidth: 1000,
    justifyContent: "center",
  },
  modalContent: {
    width: 300,
    padding: 0,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 45,
    alignItems: "center",
    borderBottom: "1px solid lightgray",
    padding: "30px 20px",
  },
  captionInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  avatar: {
    height: 30,
    width: 30,
  },
  username: {
    paddingLeft: 15,
    paddingRight: 10,
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    textDecoration: "none",
  },
  postInfo: {
    display: "flex",
    flexDirection: "column",
    maxWidth: 300,
  },
  date: {
    color: "grey",
    fontSize: 12,
    paddingLeft: 15,
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
  actionContainer: {
    borderTop: "1px solid lightgray",
    justifySelf: "flex-end",
    height: 50,
    padding: 0,
  },
  commentContainer: {
    minHeight: 450,
    overflowY: "auto",
  },
}));

const PostModal = (props) => {
  const classes = useStyles();
  const { userId, authToken } = useContext(UserContext);
  const [post, setPost] = useState(props.post);
  const [username, setUsername] = useState(props.post.User.username);
  const [userImage, setUserImage] = useState(props.post.User.imageUrl);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const postId = props.post.id;
  const date = new Date(post.createdAt);

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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ userId }),
      });
      if (response.ok) {
        setLiked(true);
      }
    } else {
      const response = await fetch(`${apiBaseUrl}/posts/${postId}/likes`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${authToken}`,
        },
        body: JSON.stringify({ userId }),
      });

      if (response.status === 204) {
        setLiked(false);
      }
    }
  };
  return (
    <div className={classes.paper}>
      <Card className={classes.modalContainer}>
        <CardMedia
          className={classes.modalImage}
          image={post.imageUrl}
        ></CardMedia>
        <div className={classes.postInfo}>
          <CardContent className={classes.modalContent}>
            <div className={classes.userInfo}>
              <Avatar className={classes.avatar} src={userImage} />
              <a className={classes.username} href={`/users/${userId}`}>
                {username}
              </a>
            </div>
          </CardContent>
          <CardContent className={classes.commentContainer}>
            <div>
              <div className={classes.captionInfo}>
                <a className={classes.username} href={`/users/${userId}`}>
                  {username}
                </a>
                {post.caption}
              </div>
              <div className={classes.date}>{`${
                date.getMonth() + 1
              }-${date.getDate()}-${date.getFullYear()}`}</div>
            </div>
          </CardContent>
          <CardContent className={classes.actionContainer}>
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
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default PostModal;
