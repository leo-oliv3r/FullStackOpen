const BLOGS_URI = "/api/blogs";

// @todo verify this fetch, i believe it's wrong
async function getAllBlogs() {
  const response = await fetch(BLOGS_URI);
  const data = await response.json();
  return data;
}

export default { getAllBlogs };
