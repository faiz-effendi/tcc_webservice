import { Sequelize } from "sequelize"

const dbContent = new Sequelize("tugas1_tcc_notes", "root", "", {
  host: "localhost",
  dialect: "mysql"
});

export default dbContent;