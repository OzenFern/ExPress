import "dotenv/config";

const env = {
  port: Number(process.env.PORT || process.env.APP_PORT || 3000),
  sessionSecret: process.env.SESSION_SECRET,
  dbConnection: process.env.DB_CONNECTION_URL,
};

export default env;
