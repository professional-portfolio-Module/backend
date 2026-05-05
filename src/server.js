const app = require("./app");
const config = require("./config/config");
const connectDB = require("./config/db");
const { connectPostgres } = require("./config/postgres");

const PORT = config.PORT;

// Connect to databases, then start server
(async () => {
  await connectDB();
  await connectPostgres();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
    console.log(`📍 Environment: ${config.NODE_ENV}`);
    console.log(`🔗 http://localhost:${PORT}`);
  });
})();


