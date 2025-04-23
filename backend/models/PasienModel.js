import { Sequelize } from "sequelize";
import db from "../config/Database.js";

// Membuat tabel "pasien"
const Pasien = db.define(
  "pasien", // Nama Tabel
  {
    nama: Sequelize.STRING,
    tgl_lahir: Sequelize.STRING,
    gender: Sequelize.STRING,
    no_telp: Sequelize.STRING,
    alamat: Sequelize.STRING
  },{
    tableName: 'pasien',
    freezeTableName: true,
    timestamps: false
}

);

db.sync().then(() => console.log("Database synced"));

export default Pasien;