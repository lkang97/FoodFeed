import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { UserContext } from "../UserContext";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "30px",
    paddingBottom: "30px",
  },
  profileImage: {
    height: "180px",
    width: "180px",
  },
  userInfo: {
    padding: "20px 65px",
  },
  username: {
    display: "flex",
    alignItems: "center",
  },
  button: {
    paddingLeft: "25px",
  },
  profileName: {
    fontWeight: "bold",
    fontSize: "17px",
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
}));

const ProfileDetails = () => {
  const classes = useStyles();
  const { userId } = useContext(UserContext);
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [profileName, setProfileName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [biography, setBiography] = useState();
  const [open, setOpen] = useState();

  useEffect(() => {
    const getUserDetails = async (id) => {
      const response = await fetch(`${apiBaseUrl}/users/${id}`);
      if (response.ok) {
        const {
          username,
          profileName,
          imageUrl,
          biography,
        } = await response.json();
        setUsername(username);
        setProfileName(profileName);
        setImageUrl(imageUrl);
        setBiography(biography);
      }
    };
    getUserDetails(id);
  }, [username, profileName, imageUrl, biography, id]);

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

  return (
    <div className={classes.detailsContainer}>
      <Avatar className={classes.profileImage} src={imageUrl} alt="user" />
      <div className={classes.userInfo}>
        <div className={classes.username}>
          <div>
            <h1>{username}</h1>
          </div>
          <div className={classes.button}>
            {userId === id ? (
              <Button variant="contained" href={`/users/${userId}/edit`}>
                Edit Profile
              </Button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
        <div className={classes.profileName}>{profileName}</div>
        <div>{biography}</div>
      </div>
    </div>
  );
};

export default ProfileDetails;
