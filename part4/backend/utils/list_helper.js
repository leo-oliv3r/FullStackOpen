function dummy(blogs) {
  return 1;
}

function getSumOfLikes(blogs) {
  return blogs.map((blog) => blog.likes).reduce((acc, current) => acc + current, 0);
}

export { dummy, getSumOfLikes };
