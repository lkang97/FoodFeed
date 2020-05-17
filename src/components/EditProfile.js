import React, { useState, useContext } from "react";

import { makeStyles } from "@material-ui/core/styles";
import IconButton from "@material-ui/core/IconButton";
import Avatar from "@material-ui/core/Avatar";
import { TextField, Button } from "@material-ui/core/";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import InputLabel from "@material-ui/core/InputLabel";

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
    width: "500px",
    height: "auto",
    borderRadius: "1.2em",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingBottom: 20,
    width: "500px",
  },
  inputFields: {
    paddingBottom: "10px",
    paddingLeft: 20,
    width: 270,
  },
  buttonContainer: {
    padding: "10px",
  },
  button: {
    width: "200px",
  },
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
  inputGroup: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    paddingBottom: 10,
  },
  inputLabels: {
    display: "flex",
    alignSelf: "center",
    justifyContent: "flex-end",
    width: 120,
    color: theme.palette.primary.main,
    fontWeight: "bold",
  },
  avatar: {
    height: 60,
    width: 60,
  },
}));

const EditProfile = (props) => {
  const classes = useStyles();
  const { id } = useParams();

  const { authToken, userId } = useContext(UserContext);

  const [profileName, setProfileName] = useState(props.profileName);
  const [username, setUsername] = useState(props.username);
  const [email, setEmail] = useState(props.email);
  const [biography, setBiography] = useState(props.biography);
  const [imageUrl, setImageUrl] = useState(props.imageUrl);
  const [isUpdated, setIsUpdated] = useState(false);

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

  const uploadImage = async (e) => {
    console.log(e.target.files);
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    const image = formData.get("image");
    console.log(image);

    const response = await fetch(`${apiBaseUrl}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
      body: formData,
    });
    if (response.ok) {
      const { imageUrl } = await response.json();
      setImageUrl(imageUrl);
    }
  };

  if (isUpdated) window.location.reload();

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <h2>Edit Profile</h2>
        </div>
        <div className={classes.inputGroup}>
          <Avatar className={classes.avatar} src={imageUrl}></Avatar>
          <div className={classes.image}>
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
          </div>
        </div>
        <div className={classes.inputGroup}>
          <InputLabel className={classes.inputLabels}>Profile Name:</InputLabel>
          <TextField
            variant="outlined"
            className={classes.inputFields}
            color="primary"
            value={profileName}
            onChange={updateProfileName}
          ></TextField>
        </div>
        <div className={classes.inputGroup}>
          <InputLabel className={classes.inputLabels}>Username: </InputLabel>
          <TextField
            variant="outlined"
            className={classes.inputFields}
            color="primary"
            value={username}
            onChange={updateUsername}
          ></TextField>
        </div>
        <div className={classes.inputGroup}>
          <InputLabel className={classes.inputLabels}>Email: </InputLabel>
          <TextField
            variant="outlined"
            className={classes.inputFields}
            color="primary"
            value={email}
            onChange={updateEmail}
          ></TextField>
        </div>
        <div className={classes.inputGroup}>
          <InputLabel className={classes.inputLabels}>Biography:</InputLabel>
          <TextField
            variant="outlined"
            multiline
            className={classes.inputFields}
            color="primary"
            value={biography}
            onChange={updateBiography}
          ></TextField>
        </div>
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
  );
};

export default EditProfile;
