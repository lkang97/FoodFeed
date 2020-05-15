import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import CardActionArea from "@material-ui/core/CardActionArea";
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import { CardContent } from "@material-ui/core";
import { apiBaseUrl } from "../config";
import Avatar from "@material-ui/core/Avatar";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 1000,
    display: "flex",
    flexDirection: "column",
    justifySelf: "center",
  },
  media: {
    height: 500,
    width: 500,
  },
  userInfo: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    height: 45,
    alignItems: "center",
  },
  avatar: {
    height: 30,
    width: 30,
  },
  username: {
    paddingLeft: 15,
    fontWeight: "bold",
    fontSize: 14,
  },
  postContainer: {
    paddingTop: 30,
  },
}));

const MainFeedPost = (props) => {
  const classes = useStyles();
  return (
    <div className={classes.postContainer}>
      <Card className={classes.root}>
        <CardContent className={classes.userInfo}>
          <Avatar className={classes.avatar} src={props.post.User.imageUrl} />
          <div className={classes.username}>{props.post.User.username}</div>
        </CardContent>
        <CardMedia
          className={classes.media}
          image={props.post.imageUrl}
        ></CardMedia>

        <CardContent></CardContent>
      </Card>
    </div>
  );
};

export default MainFeedPost;
