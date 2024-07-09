/* eslint-disable react/prop-types */
import React from "react";
import blogService from "../services/blogService";

function BlogForm({ setUsersBlog }) {
  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);

    const title = formData.get("title");
    const author = formData.get("author");
    const url = formData.get("url");

    try {
      const createdBlog = await blogService.createBlog(title, author, url);
      setUsersBlog((usersBlog) => usersBlog.concat(createdBlog));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: "10px" }}>
      <fieldset style={{ display: "flex", gap: "10px" }}>
        <legend>New blog</legend>
        <label htmlFor="title">
          Title
          <input type="text" id="title" name="title" required />
        </label>
        <label htmlFor="author">
          Author
          <input type="text" id="author" name="author" required />
        </label>
        <label htmlFor="url">
          Url
          <input type="text" id="url" name="url" required />
        </label>
        <button type="submit">Create</button>
      </fieldset>
    </form>
  );
}
export default BlogForm;
