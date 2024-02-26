import "dotenv/config";

const { PORT } = process.env;
const { MONGODB_URI } = process.env;

export default { PORT, MONGODB_URI };
