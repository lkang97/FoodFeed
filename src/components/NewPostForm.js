import React, { useState, useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { TextField, Button } from "@material-ui/core/";
import AddAPhotoIcon from "@material-ui/icons/AddAPhoto";
import { apiBaseUrl } from "../config";
import { UserContext } from "../UserContext";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import InputLabel from "@material-ui/core/InputLabel";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";

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
    width: 400,
  },
  buttonContainer: {
    padding: "10px",
  },
  button: {
    width: "200px",
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
    justifyContent: "flex-start",
    color: "black",
    fontWeight: "bold",
  },
  preview: {
    width: 300,
    height: 300,
  },
  image: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: 20,
  },
  uploadButton: {
    height: 50,
    alignSelf: "center",
  },
}));

const NewPostForm = () => {
  const classes = useStyles();
  const { userId, authToken } = useContext(UserContext);
  const [imageUrl, setImageUrl] = useState();
  const [caption, setCaption] = useState();
  const [isUpdated, setIsUpdated] = useState(false);
  const [file, setFile] = useState();

  //Sends fetch request to handle creation of new post
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`${apiBaseUrl}/posts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
      body: JSON.stringify({
        imageUrl,
        caption,
        userId,
      }),
    });
    if (response.ok) {
      setIsUpdated(true);
    }
  };

  //Uploads image to aws s3
  const uploadImage = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);
    setFile(e.target.files[0]);

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
  const updateCaption = (e) => setCaption(e.target.value);

  if (isUpdated) window.location.reload();

  return (
    <div className={classes.formContainer}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <div>
          <h2>Create a new post</h2>
        </div>
        <div className={classes.image}>
          <Card>
            {imageUrl ? (
              <CardMedia className={classes.preview}>
                <img
                  className={classes.preview}
                  src={URL.createObjectURL(file)}
                  alt="preview"
                />
              </CardMedia>
            ) : (
              <ImageIcon className={classes.preview} color="primary" />
            )}
          </Card>
          <IconButton className={classes.uploadButton}>
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
        <div className={classes.inputGroup}>
          <InputLabel className={classes.inputLabels}>Caption</InputLabel>
          <TextField
            multiline
            variant="outlined"
            className={classes.inputFields}
            color="primary"
            value={caption}
            onChange={updateCaption}
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

export default NewPostForm;
