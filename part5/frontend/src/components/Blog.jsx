/* eslint-disable react/prop-types */
import React from "react";

function Blog({ blog }) {
  return (
    <div>
      <em>{blog.title}</em> - {blog.author}
    </div>
  );
}

export default Blog;
