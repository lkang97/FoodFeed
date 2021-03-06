import React, { useState, useContext, useEffect } from "react";

import { makeStyles } from "@material-ui/core/styles";

import Button from "@material-ui/core/Button";
import { CardContent } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { UserContext } from "../UserContext";
import { apiBaseUrl } from "../config";
import TextField from "@material-ui/core/TextField";
import DeleteIcon from "@material-ui/icons/Delete";

import SingleComment from "./SingleComment";

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
    justifyContent: "space-between",
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
    height: 70,
    padding: 0,
    margin: 0,
  },
  commentContainer: {
    height: 420,
    overflowY: "auto",
    padding: "15px 5px",
  },
  newCommentForm: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: "auto",
  },
  inputField: {
    height: 30,
    marginLeft: 18,
  },
  buttonContainer: {
    height: 20,
    margin: 5,
  },
  formContainer: {
    margin: 0,
  },
  comment: {
    marginBottom: 5,
  },
  user: {
    display: "flex",
    justifySelf: "flex-start",
    alignItems: "center",
  },
}));

const PostModal = (props) => {
  const classes = useStyles();
  const { userId, authToken } = useContext(UserContext);
  const [post] = useState(props.post);
  const [username] = useState(props.post.User.username);
  const [userImage] = useState(props.post.User.imageUrl);
  const [likes, setLikes] = useState([]);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState();
  const [isUpdated, setIsUpdated] = useState(false);

  const postId = props.post.id;
  const date = new Date(post.createdAt);

  //Listens for change and updates the number of likes on a post
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

  //Listens for changes and updates the comments on a post
  useEffect(() => {
    const getComments = async () => {
      const response = await fetch(`${apiBaseUrl}/posts/${postId}/comments`);
      if (response.ok) {
        const { comments } = await response.json();
        setComments(comments);
        setIsUpdated(false);
      }
    };
    getComments();
  }, [postId, isUpdated]);

  //Sends fetch request for comment and updates state to render it
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiBaseUrl}/posts/${postId}/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ comment: newComment, userId }),
    });
    if (response.ok) {
      setNewComment("");
      setIsUpdated(true);
    }
  };

  //Will create/delete a like and render the view based off of state
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

  //Handles the deletion of a post if post owner is the same as current user
  const handleDelete = async () => {
    const response = await fetch(`${apiBaseUrl}/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({ userId }),
    });
    if (response.ok) {
      window.location.reload();
    }
  };

  const updateNewComment = (e) => setNewComment(e.target.value);

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
              <div className={classes.user}>
                <Avatar className={classes.avatar} src={userImage} />
                <a className={classes.username} href={`/users/${userId}`}>
                  {username}
                </a>
              </div>
              {Number(userId) === post.userId ? (
                <div>
                  <IconButton onClick={handleDelete}>
                    <DeleteIcon />
                  </IconButton>
                </div>
              ) : (
                <div></div>
              )}
            </div>
          </CardContent>
          <CardContent className={classes.commentContainer}>
            <div className={classes.comment}>
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
            {comments.map((comment) => {
              return <SingleComment key={comment.id} comment={comment} />;
            })}
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
            <div className={classes.formContainer}>
              <form className={classes.newCommentForm} onSubmit={handleSubmit}>
                <TextField
                  multiline
                  rowsMax={1}
                  fullWidth
                  color="primary"
                  placeholder="Add Comment"
                  className={classes.inputField}
                  value={newComment}
                  onChange={updateNewComment}
                ></TextField>

                <div className={classes.buttonContainer}>
                  <Button size="small" type="submit">
                    Post
                  </Button>
                </div>
              </form>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default PostModal;
