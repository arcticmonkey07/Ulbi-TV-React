import { useState, useEffect, useRef } from "react";
import "./Posts.css";
import classes from "./Posts.module.css";
import PostForm from "../../Components/PostForm/PostForm";
import PostList from "../../Components/PostList/PostList";
import PostFilter from "../../Components/PostFilter/PostFilter";
import MyModal from "../../Components/UI/modal/MyModal";
import MyButton from "../../Components/UI/button/MyButton";
import { usePosts } from "../../hooks/usePosts";
import PostService from "../../API/PostService";
import Loader from "../../Components/UI/loader/Loader";
import { useFetching } from "../../hooks/useFetching";
import { getPageCount } from "../../utils/pages";
import Pagination from "../../Components/UI/pagination/Pagination";
import { useObserver } from "./../../hooks/useObserver";
import MySelect from "../../Components/UI/select/MySelect";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [filter, setFilter] = useState({ sort: "", query: "" });
  const [modal, setModal] = useState(false);
  const [totalPages, setTotalPages] = useState(0);
  const [limit, setLimit] = useState(10);
  const [page, setPage] = useState(1);
  const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query);
  const lastElement = useRef();

  const [fetchPosts, isPostsLoading, postError] = useFetching(async () => {
    const response = await PostService.getAll(limit, page);
    setPosts([...posts, ...response.data]);
    const totalCount = response.headers["x-total-count"];
    setTotalPages(getPageCount(totalCount, limit));
  });

  useObserver(lastElement, page < totalPages, isPostsLoading, () => {
    setPage(page + 1);
  });

  useEffect(() => {
    fetchPosts();
  }, [page, limit]);

  const createPost = (newPost) => {
    setPosts([...posts, newPost]);
    setModal(false);
  };

  const removePost = (post) => {
    setPosts(posts.filter((item) => item.id !== post.id));
  };

  const changePage = (page) => {
    setPage(page);
  };

  return (
    <div className={classes.app}>
      <MyButton onClick={() => setModal(true)}>Create Post</MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost} />
      </MyModal>
      <PostFilter filter={filter} setFilter={setFilter} />
      <MySelect
        value={limit}
        onChange={(value) => setLimit(value)}
        defaultValue={"Amount of elements on page"}
        options={[
          { value: 5, name: "5" },
          { value: 10, name: "10" },
          { value: 25, name: "25" },
          { value: -1, name: "Show all" },
        ]}
      />
      {postError ?? <h1>Error: ${postError} </h1>}
      <PostList
        remove={removePost}
        posts={sortedAndSearchedPosts}
        title={"List of Posts"}
      />
      <div ref={lastElement}></div>
      {isPostsLoading && <Loader />}
      <Pagination totalPages={totalPages} page={page} changePage={changePage} />
    </div>
  );
}

export default Posts;
