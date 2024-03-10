// eslint-disable-next-line no-unused-vars
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

function getAuthorWithMostBlogs(blogs) {
  if (blogs.length === 0) return null;

  const uniqueNames = Array.from(new Set(blogs.map((blog) => blog.author)));
  const authorsWithNrBlogs = uniqueNames.map((name) => ({ name, nrBlogs: 0 }));

  blogs.forEach((blog) => {
    const currentAuthor = authorsWithNrBlogs.find((author) => author.name === blog.author);
    currentAuthor.nrBlogs += 1;
  });

  return authorsWithNrBlogs.sort((a, b) => b.nrBlogs - a.nrBlogs)[0];
}

export { dummy, getSumOfLikes, getFavoriteBlog, getAuthorWithMostBlogs };
