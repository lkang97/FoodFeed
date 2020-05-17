import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Avatar from "@material-ui/core/Avatar";

import { apiBaseUrl } from "../config";
import { CardContent } from "@material-ui/core";
import { UserContext } from "../UserContext";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 300,
    display: "flex",
    justifySelf: "center",
  },
  media: {
    height: 300,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
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
    alignItems: "flex-end",
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
  },
  date: {
    color: "grey",
    fontSize: 12,
    paddingLeft: 15,
  },
}));

const ProfileImageCard = (props) => {
  const classes = useStyles();
  const { authToken, userId } = useContext(UserContext);
  const [open, setOpen] = useState();
  const [post, setPost] = useState(props.post);
  const [username, setUsername] = useState(props.post.User.username);
  const [userImage, setUserImage] = useState(props.post.User.imageUrl);
  const date = new Date(post.createdAt);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const postModal = (
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
          <CardContent>
            <div>
              <div className={classes.captionInfo}>
                <a className={classes.username} href={`/users/${userId}`}>
                  {username}
                </a>
                <div>{post.caption}</div>
              </div>
              <div className={classes.date}>{`${
                date.getMonth() + 1
              }-${date.getDate()}-${date.getFullYear()}`}</div>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  );

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleOpen}>
        <CardMedia className={classes.media} image={props.imageUrl} />
      </CardActionArea>
      <Modal
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        {postModal}
      </Modal>
    </Card>
  );
};

export default ProfileImageCard;
