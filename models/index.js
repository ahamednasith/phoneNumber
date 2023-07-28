const dbConfig = require('../config/dbConfig');
const { Sequelize,DataTypes } = require('sequelize');

const sequelize = new Sequelize(dbConfig.DB,dbConfig.USER,dbConfig.PASSWORD,{
    host:dbConfig.HOST,
    dialect:dbConfig.dialect,
    port:8889,
});

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contact = require('./phoneModels')(sequelize,DataTypes);

db.sequelize.sync();

module.exports = db;
