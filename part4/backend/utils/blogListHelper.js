function getSumOfLikes(blogs) {
  return blogs.map((blog) => blog.likes || 0).reduce((acc, current) => acc + current, 0);
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
  const blogsScore = uniqueNames.map((name) => ({ author: name, nrBlogs: 0 }));

  blogs.forEach((blog) => {
    const currentAuthor = blogsScore.find((author) => author.author === blog.author);

    // @ts-ignore
    currentAuthor.nrBlogs += 1;
  });

  return blogsScore.sort((a, b) => b.nrBlogs - a.nrBlogs)[0];
}

export { getSumOfLikes, getFavoriteBlog, getAuthorWithMostBlogs };
