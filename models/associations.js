const Store = require('./Store');
const Manager = require('./Manager');
const Department = require('./Department');
const Product = require('./Product');
const Warehouse = require('./Warehouse');
const DepartmentProduct = require('./DepartmentProduct');
const WarehouseProduct = require('./WarehouseProduct');

// Store - Department (1:M)
Store.hasMany(Department, { foreignKey: 'store_id' });
Department.belongsTo(Store, { foreignKey: 'store_id' });

// Manager - Department (1:M)
Manager.hasMany(Department, { foreignKey: 'manager_id' });
Department.belongsTo(Manager, { foreignKey: 'manager_id' });

// Department - Product (M:M через DepartmentProduct)
Department.belongsToMany(Product, {
  through: DepartmentProduct,
  foreignKey: 'department_id',
  otherKey: 'product_id'
});
Product.belongsToMany(Department, {
  through: DepartmentProduct,
  foreignKey: 'product_id',
  otherKey: 'department_id'
});

// Warehouse - Product (M:M через WarehouseProduct)
Warehouse.belongsToMany(Product, {
  through: WarehouseProduct,
  foreignKey: 'warehouse_id',
  otherKey: 'product_id'
});
Product.belongsToMany(Warehouse, {
  through: WarehouseProduct,
  foreignKey: 'product_id',
  otherKey: 'warehouse_id'
});

// DepartmentProduct связи
Department.hasMany(DepartmentProduct, { foreignKey: 'department_id' });
DepartmentProduct.belongsTo(Department, { foreignKey: 'department_id' });

Product.hasMany(DepartmentProduct, { foreignKey: 'product_id' });
DepartmentProduct.belongsTo(Product, { foreignKey: 'product_id' });

// WarehouseProduct связи
Warehouse.hasMany(WarehouseProduct, { foreignKey: 'warehouse_id' });
WarehouseProduct.belongsTo(Warehouse, { foreignKey: 'warehouse_id' });

Product.hasMany(WarehouseProduct, { foreignKey: 'product_id' });
WarehouseProduct.belongsTo(Product, { foreignKey: 'product_id' });

module.exports = {
  Store,
  Manager,
  Department,
  Product,
  Warehouse,
  DepartmentProduct,
  WarehouseProduct
};