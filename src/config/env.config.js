import "dotenv/config.js";

const env = {
  port: env.process.APP_PORT,
  sessionSecret: env.process.SESSION_SECRET,
  dbConnection: env.process.DB_CONNECTION_URL,
};

export default env;
