const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const WarehouseProduct = sequelize.define('WarehouseProduct', {
  warehouse_id: {
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
  price: {
    type: DataTypes.DECIMAL(10, 2),
  },
}, {
  tableName: 'WarehouseProduct',
  timestamps: false,
});

module.exports = WarehouseProduct;
