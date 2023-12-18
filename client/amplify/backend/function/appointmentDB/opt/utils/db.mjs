import { Sequelize } from "sequelize";

const sequelize = new Sequelize("GurudwaraDB", "admin", "Test1234", {
  host: "gurudwaradb.cc0y2bbfi6ly.ap-southeast-1.rds.amazonaws.com",
  dialect: "mysql",
  logging: false,
  // (...)
  pool: {
    max: 2,
    min: 0,
    idle: 0,
    acquire: 3000,
    evict: 5000,
  },
});

async function connectDB() {
  try {
    console.log(process.env.DB);
    await sequelize.authenticate();
    sequelize.connectionManager.initPools();

    // Restore `getConnection()` if it has been overwritten by `close()`
    if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
      delete sequelize?.connectionManager?.getConnection;
    }

    console.log("✅ Connection has been established successfully.");
    return sequelize;
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

sequelize.sync().then(() => {
  console.log("db has been sync");
});

export { connectDB, sequelize, Sequelize };
