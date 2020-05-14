import React, { useState, useContext, useEffect } from "react";

import NavBar from "./NavBar";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { TextField, Button } from "@material-ui/core/";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import Modal from "@material-ui/core/Modal";

import { apiBaseUrl } from "../config";
import { useParams, Redirect } from "react-router-dom";
import { UserContext } from "../UserContext";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  formContainer: {
    display: "flex",
    justifyContent: "center",
    justifySelf: "center",
    border: "1px solid grey",
    boxShadow: "0px 11px 35px 2px rgba(0, 0, 0, 0.14)",
    width: "300px",
    height: "450px",
    borderRadius: "1.2em",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "5px",
    width: "300px",
  },
  inputFields: {
    paddingBottom: "10px",
  },
  buttonContainer: {
    padding: "5px",
  },
  button: {
    width: "200px",
  },
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const EditProfile = () => {
  const classes = useStyles();
  const { id } = useParams();

  const { authToken, userId } = useContext(UserContext);

  const [profileName, setProfileName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [biography, setBiography] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  //   const [open, setOpen] = useState();
  //   const [modalStyle] = useState(getModalStyle);

  useEffect(() => {
    const getUserInfo = async () => {
      const response = await fetch(`${apiBaseUrl}/users/${id}`);
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

    getUserInfo();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiBaseUrl}/users/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        profileName,
        username,
        email,
        biography,
        imageUrl,
        userId,
      }),
    });

    if (response.ok) {
      setIsUpdated(true);
    }
  };

  const updateProfileName = (e) => setProfileName(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updateBiography = (e) => setBiography(e.target.value);

  //   const handleOpen = () => {
  //     setOpen(true);
  //   };

  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  //   const imageModal = (
  //     <div style={modalStyle} className={classes.paper}>
  //       <h2>Text in a modal</h2>
  //       <p>Duis mollis, est non commodo luctus, nisi erat porttitor ligula.</p>
  //     </div>
  //   );

  const uploadImage = async (e) => {
    console.log(e.target.files);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const image = formData.get("image");
    console.log(image);

    const response = await fetch(`${apiBaseUrl}/upload`, {
      method: "POST",
      body: formData,
    });
    if (response.ok) {
      const { imageUrl } = await response.json();
      setImageUrl(imageUrl);
    }
  };

  if (isUpdated) return <Redirect to={`/users/${id}`} />;

  return (
    <div>
      <NavBar />
      <div className={classes.formContainer}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <div>
            <h2>Edit Profile</h2>
          </div>
          <div>
            <Avatar src={imageUrl}></Avatar>
            <div>
              <IconButton>
                <input
                  accept="image/*"
                  style={{ display: "none" }}
                  type="file"
                  id="raised-button-file"
                  onChange={uploadImage}
                ></input>
                <label htmlFor="raised-button-file">
                  <AddAPhotoIcon variant="raised"></AddAPhotoIcon>
                </label>
              </IconButton>
              {/* <Modal open={open} onClose={handleClose}>
                {imageModal}
              </Modal> */}
            </div>
          </div>
          <TextField
            className={classes.inputFields}
            color="primary"
            value={profileName}
            onChange={updateProfileName}
          ></TextField>
          <TextField
            className={classes.inputFields}
            color="primary"
            value={username}
            onChange={updateUsername}
          ></TextField>
          <TextField
            className={classes.inputFields}
            color="primary"
            value={email}
            onChange={updateEmail}
          ></TextField>
          <TextField
            multiline
            className={classes.inputFields}
            color="primary"
            value={biography}
            onChange={updateBiography}
          ></TextField>
          <div className={classes.buttonContainer}>
            <Button
              className={classes.button}
              color="primary"
              variant="contained"
              type="submit"
            >
              Submit
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
