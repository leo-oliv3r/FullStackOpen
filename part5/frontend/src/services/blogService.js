import axios from "axios";
const BLOGS_URI = "/api/blogs";

async function getAllBlogs() {
  const response = await axios.get(BLOGS_URI);
  return response.data;
}

export default { getAllBlogs };
