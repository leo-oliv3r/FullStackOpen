import axios from "axios";
import loginService from "./loginService";

const BLOGS_URI = "/api/blogs";

async function getAllBlogs() {
  const response = await axios.get(BLOGS_URI);
  return response.data;
}

async function createBlog(title, author, url) {
  const config = {
    headers: {
      Authorization: loginService.getCurrentUserToken(),
    },
  };

  const blogData = {
    title,
    author,
    url,
  };

  const response = await axios.post(BLOGS_URI, blogData, config);
  return response.data;
}

export default { getAllBlogs, createBlog };
