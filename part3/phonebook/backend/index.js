import app from "./app.js";
import logger from "./utils/logger.js";
import config from "./utils/config.js";

// @todo Once integration with frontend is done, deploy to fly.io

app.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`);
});
