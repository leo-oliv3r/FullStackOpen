/* eslint-disable react/prop-types */
import React from "react";
import Blog from "./Blog";

function BlogList({ blogs }) {
  return (
    <>
      <h2>Blog List</h2>
      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </ul>
    </>
  );
}

export default BlogList;
