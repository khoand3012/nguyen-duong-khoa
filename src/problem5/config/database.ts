import path from "path";
import { Sequelize } from "sequelize";

const dbInstance = new Sequelize({
  host: "localhost",
  dialect: "sqlite",
  storage: path.resolve(__dirname, "data.sqlite"),
});

export default dbInstance;
