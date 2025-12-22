import app from "./app.js";
import { ENV } from "./config/env.js";
import { sequelize } from "./config/db.js";

const connectWithRetry = async (retries = 5) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("✅ Database connected & synced");

    app.listen(ENV.PORT, () => {
      console.log(`✅ Server running on port ${ENV.PORT}`);
    });
  } catch (error) {
    if (retries === 0) {
      console.error("❌ Database connection failed permanently", error);
      process.exit(1);
    }

    console.log(
      `⏳ Database not ready, retrying in 5s... (${retries} retries left)`
    );
    setTimeout(() => connectWithRetry(retries - 1), 5000);
  }
};

connectWithRetry();
