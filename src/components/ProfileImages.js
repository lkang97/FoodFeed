import React, { useState, useEffect, useContext } from "react";
import { apiBaseUrl } from "../config";
import ProfileImageCard from "./ProfileImageCard";
import { makeStyles } from "@material-ui/core/styles";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";
import Button from "@material-ui/core/Button";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import { Typography } from "@material-ui/core";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import NewPostForm from "./NewPostForm";

const useStyles = makeStyles((theme) => ({
  imagesContainer: {
    width: 1000,
    flexDirection: "row-wrap",
    justifySelf: "center",
    justifyContent: "center",
    paddingTop: 5,
    borderTop: "1px solid lightgray",
  },
  gridTiles: {
    justifyContent: "center",
  },
  newPost: {
    display: "flex",
    justifyContent: "center",
    alignItems: "flex-start",
    paddingBottom: 15,
  },
  addIcon: {
    height: 13,
    width: 13,
  },
  addText: {
    padding: 3,
    fontSize: 13,
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "auto",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const ProfileImages = () => {
  const { authToken, userId } = useContext(UserContext);
  const classes = useStyles();
  const { id } = useParams();
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState();

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

  const handleOpen = async () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className={classes.imagesContainer}>
      <div className={classes.newPost}>
        {userId === id ? (
          <div>
            <Button onClick={handleOpen}>
              <AddCircleIcon className={classes.addIcon} color="primary" />
              <Typography className={classes.addText} color="primary">
                New Post
              </Typography>
            </Button>
            <Modal
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{ timeout: 500 }}
            >
              <div className={classes.paper}>
                <NewPostForm />
              </div>
            </Modal>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <GridList cellHeight={330} cols={3}>
        {posts.map((post) => {
          return (
            <GridListTile className={classes.gridTiles} key={post.id}>
              <ProfileImageCard
                key={post.id}
                imageUrl={post.imageUrl}
                postId={post.id}
                post={post}
              />
            </GridListTile>
          );
        })}
      </GridList>
    </div>
  );
};

export default ProfileImages;
