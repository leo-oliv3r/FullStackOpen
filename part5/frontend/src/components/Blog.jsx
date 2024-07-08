/* eslint-disable react/prop-types */
import React from "react";

function Blog({ blog }) {
  return (
    <li>
      <em>{blog.title}</em> - {blog.author}
    </li>
  );
}

export default Blog;
