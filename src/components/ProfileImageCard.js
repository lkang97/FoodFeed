import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

import PostModal from "./PostModal";

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
}));

const ProfileImageCard = (props) => {
  const classes = useStyles();
  const [open, setOpen] = useState();
  const [post] = useState(props.post);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Card className={classes.root}>
      <CardActionArea onClick={handleOpen}>
        <CardMedia className={classes.media} image={post.imageUrl} />
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
        <div>
          <PostModal post={post} />
        </div>
      </Modal>
    </Card>
  );
};

export default ProfileImageCard;
