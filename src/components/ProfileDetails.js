import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../config";

import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import { UserContext } from "../UserContext";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import EditProfile from "./EditProfile";

const useStyles = makeStyles((theme) => ({
  detailsContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: "30px",
    paddingBottom: "30px",
    maxWidth: 1000,
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
    height: "auto",
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
  const { userId, authToken } = useContext(UserContext);
  const { id } = useParams();
  const [username, setUsername] = useState();
  const [profileName, setProfileName] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [biography, setBiography] = useState();
  const [email, setEmail] = useState();

  const [open, setOpen] = useState();

  useEffect(() => {
    const getUserDetails = async (id) => {
      const response = await fetch(`${apiBaseUrl}/users/${id}`, {
        headers: { Authorization: `Bearer ${authToken}` },
      });
      if (response.ok) {
        const {
          username,
          profileName,
          imageUrl,
          biography,
          email,
        } = await response.json();
        setUsername(username);
        setProfileName(profileName);
        setImageUrl(imageUrl);
        setBiography(biography);
        setEmail(email);
      }
    };
    getUserDetails(id);
  }, [username, profileName, imageUrl, biography, id, authToken]);

  const handleOpen = async () => {
    setOpen(true);
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
              <div>
                <Button variant="contained" onClick={handleOpen}>
                  Edit Profile
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
                    <EditProfile
                      username={username}
                      profileName={profileName}
                      imageUrl={imageUrl}
                      biography={biography}
                      email={email}
                    />
                  </div>
                </Modal>
              </div>
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
