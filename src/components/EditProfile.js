import React, { useState, useContext, useEffect } from "react";
import NavBar from "./NavBar";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { TextField, Button } from "@material-ui/core/";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { apiBaseUrl } from "../config";
import { useParams } from "react-router-dom";
import { UserContext } from "../UserContext";

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
}));

const EditProfile = () => {
  const classes = useStyles();
  const { id } = useParams();

  const { authToken } = useContext(UserContext);

  const [profileName, setProfileName] = useState();
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [biography, setBiography] = useState();
  const [imageUrl, setImageUrl] = useState();

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
      body: JSON.stringify({ profileName, username, email }),
    });
  };

  const updateProfileName = (e) => setProfileName(e.target.value);
  const updateUsername = (e) => setUsername(e.target.value);
  const updateEmail = (e) => setEmail(e.target.value);
  const updateBiography = (e) => setBiography(e.target.value);

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
            <IconButton>
              <AddAPhotoIcon onClick={openImageModal}></AddAPhotoIcon>
            </IconButton>
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
