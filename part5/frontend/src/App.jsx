import React from "react";
import { useState, useEffect } from "react";
import blogService from "./services/blogService";
import BlogList from "./components/BlogList";
import LoginForm from "./components/LoginForm";
import UserPanel from "./components/UserPanel";

function App() {
  const [user, setUser] = useState(null);
  const [userBlogs, setUserBlogs] = useState([]);

  useEffect(() => {
    const localStorageUser = window.localStorage.getItem("loggedUser");
    if (localStorageUser) {
      const user = JSON.parse(localStorageUser);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    if (!user) return;

    blogService.getAllBlogs().then((allBlogs) => {
      const filteredBlogs = allBlogs.filter((blog) => blog.user.username === user.username);
      setUserBlogs(filteredBlogs);
    });
  }, [user]);

  return (
    <>
      <h1>Blogs Archive</h1>
      {user && <UserPanel user={user} setUser={setUser} />}
      {user ? <BlogList blogs={userBlogs} /> : <LoginForm setUser={setUser} />}
    </>
  );
}

export default App;
