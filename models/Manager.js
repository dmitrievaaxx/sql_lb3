const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Manager = sequelize.define('Manager', {
  manager_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  manager_name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'Manager',
  timestamps: false,
});

module.exports = Manager;
