import { DATE, NOW, NUMBER, STRING, UUID, UUIDV4 } from "sequelize";
import dbInstance from "config/database";

const Item = dbInstance.define("item", {
  id: {
    type: UUID,
    defaultValue: UUIDV4,
    allowNull: false,
    primaryKey: true,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  description: {
    type: STRING,
  },
  quantity: {
    type: NUMBER,
    defaultValue: 0,
  },
  createdDate: {
    type: DATE,
    defaultValue: NOW,
  },
});

dbInstance.sync();

export default Item;
