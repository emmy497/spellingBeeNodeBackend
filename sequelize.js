import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config();

const sequelize = new Sequelize("spelling_db", "root", "nuel2774", {
  host: "localhost",
  dialect: "mysql",
});

export default sequelize;
