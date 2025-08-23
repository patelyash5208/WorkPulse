module.exports = {
  apps: [
    {
      name: "workpulse-backend",
      script: "server.js", // replace with your main backend file
      env: {
        NODE_ENV: "development",
        PORT: process.env.PORT,
        MONGO_URI: process.env.MONGO_URI,
        JWT_SECRET: process.env.JWT_SECRET,
      },
      env_production: {
        NODE_ENV: "production",
      },
    },
  ],
};
