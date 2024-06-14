import { useState, useEffect } from "react";
import blogService from "./services/blogService";

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    blogService.getAllBlogs().then((fetchedBlogs) => setBlogs(fetchedBlogs));
  }, []);

  return (
    <div>
      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  );
}

export default App;
