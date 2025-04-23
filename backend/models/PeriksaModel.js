import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Pasien from "./PasienModel.js";
import Obat from "./ObatModel.js";

const { DataTypes } = Sequelize;

const Periksa = db.define('periksa', {
  id_periksa: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  tanggal_periksa: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW
  },
  biaya_periksa: {
    type: DataTypes.STRING,
    allowNull: false
  },
  pasienId: {
    type: DataTypes.INTEGER,
    references: {
      model: Pasien,
      key: 'id'
    }
  },
  obatId: {
    type: DataTypes.INTEGER,
    references: {
      model: Obat,
      key: 'id_obat'
    }
  }
}, {
  tableName: 'periksa',
  freezeTableName: true,
  timestamps: false
});

// Relasi
Pasien.hasMany(Periksa, { foreignKey: "pasienId" });
Periksa.belongsTo(Pasien, { foreignKey: "pasienId" });

Obat.hasMany(Periksa, { foreignKey: "obatId" });
Periksa.belongsTo(Obat, { foreignKey: "obatId" });

export default Periksa;

(async () => {
  await db.sync();
})();
