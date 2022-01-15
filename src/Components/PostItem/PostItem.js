import React from "react";
import classes from "./PostItem.module.css";
import { useHistory } from "react-router-dom";

const PostItem = (props) => {
  const router = useHistory();

  return (
    <div className={classes.post_item}>
      <div className={classes.left}>
        <h1 className={classes.post_header}>
          {props.post.id}. {props.post.title}
        </h1>
        <p>{props.post.body}</p>
      </div>
      <div className={classes.right}>
        <button
          className={`${classes.post_button} ${classes.post_open_button}`}
          onClick={() => router.push(`/posts/${props.post.id}`)}
        >
          Open
        </button>
        <button
          className={`${classes.post_button} ${classes.post_del_button}`}
          onClick={() => props.remove(props.post)}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default PostItem;
