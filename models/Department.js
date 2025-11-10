const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Department = sequelize.define('Department', {
  department_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
}, {
  tableName: 'Department',
  timestamps: false,
});

module.exports = Department;
