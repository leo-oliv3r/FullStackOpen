import "dotenv/config";

const { PORT } = process.env;
const { NODE_ENV } = process.env;
const MONGODB_URI = NODE_ENV === "test" ? process.env.TEST_MONGODB_URI : process.env.MONGODB_URI;

export default { PORT, MONGODB_URI };
