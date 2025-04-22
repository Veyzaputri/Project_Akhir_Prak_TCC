import {Sequelize} from "sequelize";
const db = new Sequelize ('rsj_cc','root','',{
    host: 'localhost',
    dialect: 'mysql'
});

export default db;
