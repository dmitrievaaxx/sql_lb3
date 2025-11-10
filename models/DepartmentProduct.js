const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const DepartmentProduct = sequelize.define('DepartmentProduct', {
  department_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  product_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  quantity: {
    type: DataTypes.INTEGER,
  },
  retail_price: {
    type: DataTypes.DECIMAL(10, 2),
  },
}, {
  tableName: 'DepartmentProduct',
  timestamps: false,
});

module.exports = DepartmentProduct;
