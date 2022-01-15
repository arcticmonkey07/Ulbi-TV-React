import React from "react";
import classes from './PostList.module.css';
import { TransitionGroup, CSSTransition } from "react-transition-group";
import PostItem from "../PostItem/PostItem";

const PostList = ({ title, posts, remove }) => {
  if (!posts.length) {
    return <p>No posts found.</p>;
  }

  return (
    <div>
      <h1>{title}</h1>
      <TransitionGroup>
        {posts.map((post, index) => (
          <CSSTransition key={post.id} timeout={500} classNames="post">
            <PostItem remove={remove} post={post} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
};

export default PostList;
