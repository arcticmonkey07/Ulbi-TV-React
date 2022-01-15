import React, { useState, useEffect } from "react";
import classes from "./PostIdPage.module.css";
import { useParams } from "react-router-dom";
import Loader from "../../Components/UI/loader/Loader";
import { useFetching } from "../../hooks/useFetching";
import PostService from "./../../API/PostService";

const PostIdPage = () => {
  const params = useParams();
  const [post, setPost] = useState({});
  const [comments, setComments] = useState([]);

  const [fetchPostById, isLoading, error] = useFetching(async () => {
    const response = await PostService.getById(params.id);
    setPost(response.data);
  });

  const [fetchComments, isComLoading, comError] = useFetching(async () => {
    const response = await PostService.getCommentsByPostId(params.id);
    setComments(response.data);
  });

  useEffect(() => {
    fetchPostById(params.id);
    fetchComments(params.id);
  }, []);

  return (
    <div className={classes.post_id_page}>
      <h1>Post Id Page: {params.id}</h1>
      {isLoading ? (
        <Loader />
      ) : (
        <div>
          <div className={classes.title}>
            {post.id}. {post.title}
          </div>
          <div className={classes.body}>{post.body}</div>
          <h2>Comments:</h2>
          {isComLoading ? (
            <Loader />
          ) : (
            <div>
              {comments.map((com) => (
                <div className={classes.comment} key={com.id}>
                  <div>
                    <span>Name:</span>
                    <span className={classes.comment_name}>{com.name}</span>
                  </div>
                  <div>
                    <span>Email:</span>
                    <span className={classes.comment_email}>{com.email}</span>
                  </div>
                  <p className={classes.comment_body}>{com.body}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PostIdPage;
