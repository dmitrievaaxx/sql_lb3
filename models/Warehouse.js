const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Warehouse = sequelize.define('Warehouse', {
  warehouse_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'Warehouse',
  timestamps: false,
});

module.exports = Warehouse;
