/* eslint-disable react/prop-types */
import React from "react";
import Blog from "./Blog";

function BlogList({ blogs }) {
  return (
    <>
      <h2>Blogs</h2>
      <div>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} />
        ))}
      </div>
    </>
  );
}

export default BlogList;
