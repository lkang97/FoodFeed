import React from "react";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  comment: {
    marginBottom: 5,
  },
  commentBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  },
  date: {
    color: "grey",
    fontSize: 12,
    paddingLeft: 15,
  },
  username: {
    paddingLeft: 15,
    paddingRight: 10,
    fontWeight: "bold",
    fontSize: 14,
    color: "black",
    textDecoration: "none",
  },
}));

//Renders a single comment on a post
const SingleComment = (props) => {
  const classes = useStyles();

  const comment = props.comment;
  const user = props.comment.User;
  const date = new Date(comment.createdAt);
  return (
    <div className={classes.comment}>
      <div className={classes.commentBox}>
        <a className={classes.username} href={`/users/${user.id}`}>
          {user.username}
        </a>
        {comment.comment}
      </div>
      <div className={classes.date}>{`${
        date.getMonth() + 1
      }-${date.getDate()}-${date.getFullYear()}`}</div>
    </div>
  );
};

export default SingleComment;
