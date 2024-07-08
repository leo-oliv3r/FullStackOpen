import React from "react";
import { useState, useEffect } from "react";
import blogService from "./services/blogService";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";

function App() {
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    blogService.getAllBlogs().then((fetchedBlogs) => setUserBlogs(fetchedBlogs));
  }, []);

  return user ? <BlogList /> : <LoginForm />;
}

export default App;
