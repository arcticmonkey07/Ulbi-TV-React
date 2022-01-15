import React from "react";
import "./Pagination.css";
import classes from "./Pagination.module.css";
import MyButton from "../button/MyButton";
import { getPagesArray } from "../../../utils/pages";

const Pagination = ({ totalPages, page, changePage }) => {
  let pagesArray = getPagesArray(totalPages);

  return (
    <div className={classes.pagination}>
      {pagesArray.map((p) => (
        <MyButton
          className={page === p ? "page page_current" : "page"}
          onClick={() => changePage(p)}
          key={p}
        >
          {p}
        </MyButton>
      ))}
    </div>
  );
};

export default Pagination;
