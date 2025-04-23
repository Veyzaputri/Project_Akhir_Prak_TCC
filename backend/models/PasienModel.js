import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Dokter from "./DokterModel.js";

// Membuat tabel "pasien"
const Pasien = db.define(
  "pasien", // Nama Tabel
  {
    nama: Sequelize.STRING,
    tgl_lahir: Sequelize.STRING,
    gender: Sequelize.STRING,
    no_telp: Sequelize.STRING,
    alamat: Sequelize.STRING,
    id_dokter: {
      type: Sequelize.INTEGER,
      references: {
        model: Dokter,
        key: "id_dokter"
    }
  }
  },{
    tableName: 'pasien',
    freezeTableName: true,
    timestamps: false
}

);
Pasien.belongsTo(Dokter, { foreignKey: "nama_dokter"});
db.sync().then(() => console.log("Database synced"));

export default Pasien;