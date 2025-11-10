const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Store = sequelize.define('Store', {
  store_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  class: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  number: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'Store',
  timestamps: false,
});

module.exports = Store;
