class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound";
  }
}

export default NotFoundError;
