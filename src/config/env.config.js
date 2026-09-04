import "dotenv/config.js";

const env = {
  port: process.env.APP_PORT,
  sessionSecret: process.env.SESSION_SECRET,
  dbConnection: process.env.DB_CONNECTION_URL,
};

export default env;
