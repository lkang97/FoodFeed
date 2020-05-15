import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

import { apiBaseUrl } from "../config";
import { CardContent } from "@material-ui/core";

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
  },
}));

const ProfileImageCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState();
  const [post, setPost] = useState({});
  const { postId } = props;

  const handleOpen = async () => {
    setOpen(true);
    const response = await fetch(`${apiBaseUrl}/posts/${postId}`);
    if (response.ok) {
      const { post } = await response.json();
      setPost(post);
    }
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
        <CardContent className={classes.modalContent}>
          <p>{post.caption}</p>
        </CardContent>
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
