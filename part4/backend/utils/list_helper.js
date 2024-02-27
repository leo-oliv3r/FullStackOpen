function dummy(blogs) {
  return 1;
}

function getSumOfLikes(blogs) {
  return blogs.map((blog) => blog.likes).reduce((acc, current) => acc + current, 0);
}

function getFavoriteBlog(blogs) {
  if (blogs.length === 0) return null;

  const highestNrOfLikes = Math.max(...blogs.map((blog) => blog.likes));
  const mostLikedBlog = blogs.find((blog) => blog.likes === highestNrOfLikes);

  const { title, author, likes } = mostLikedBlog;

  return { title, author, likes };
}

export { dummy, getSumOfLikes, getFavoriteBlog };
