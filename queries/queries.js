const { sequelize } = require('../models/index');
const {
  Store,
  Manager,
  Department,
  Product,
  Warehouse,
  DepartmentProduct,
  WarehouseProduct
} = require('../models/associations');

async function runQueries() {
  try {
    await sequelize.query('PRAGMA foreign_keys = ON');
    console.log('=== ЛАБОРАТОРНАЯ РАБОТА № 3 ===\n');

    // 1. Какие товары имеются в магазине 102?
    console.log('1. Товары в магазине 102:');
    const query1 = await Store.findAll({
      where: { number: 102 },
      include: [{
        model: Department,
        include: [{
          model: Product,
          through: {
            attributes: ['quantity', 'retail_price']
          }
        }]
      }]
    });

    const productsInStore102 = [];
    query1.forEach(store => {
      store.Departments.forEach(dept => {
        dept.Products.forEach(product => {
          productsInStore102.push({
            'Название товара': product.name,
            'Количество': product.DepartmentProduct.quantity,
            'Розничная цена': product.DepartmentProduct.retail_price
          });
        });
      });
    });
    productsInStore102.sort((a, b) => a['Название товара'].localeCompare(b['Название товара']));
    console.table(productsInStore102);

    // 2. Какие товары имеются на базе "Центральный склад"?
    console.log('\n2. Товары на Центральном складе:');
    const query2 = await Warehouse.findOne({
      where: { name: 'Центральный склад' },
      include: [{
        model: Product,
        through: {
          attributes: ['quantity', 'price']
        }
      }]
    });

    const productsInCentralWarehouse = query2.Products
        .map(product => ({
          'Название базы': query2.name,
          'Название товара': product.name,
          'Количество': product.WarehouseProduct.quantity,
          'Закупочная цена': product.WarehouseProduct.price
        }))
        .sort((a, b) => a['Название товара'].localeCompare(b['Название товара']));
    console.table(productsInCentralWarehouse);

    // 3. Какие отсутствующие товары может заказать магазин 102 на базе "Центральный склад"?
    console.log('\n3. Отсутствующие товары для магазина 102 на Центральном складе:');

    // Находим магазин 102 и его отделы
    const store102 = await Store.findOne({
      where: { number: 102 },
      include: [{
        model: Department
      }]
    });

    // Получаем ID всех отделов магазина 102
    const departmentIds = store102.Departments.map(dept => dept.department_id);

    // Находим все товары, которые есть в магазине 102 с количеством > 0
    const productsInStore102WithStock = await DepartmentProduct.findAll({
      where: {
        department_id: { [sequelize.Sequelize.Op.in]: departmentIds },
        quantity: { [sequelize.Sequelize.Op.gt]: 0 }
      }
    });

    const productIdsInStore102 = productsInStore102WithStock.map(dp => dp.product_id);

    // Находим все товары на центральном складе
    const centralWarehouse = await Warehouse.findOne({
      where: { name: 'Центральный склад' },
      include: [{
        model: Product,
        through: {
          attributes: ['quantity', 'price']
        }
      }]
    });

    // Фильтруем товары: те, что есть на складе, но отсутствуют в магазине 102
    const missingProducts = centralWarehouse.Products
        .filter(product =>
            !productIdsInStore102.includes(product.product_id) &&
            product.WarehouseProduct.quantity > 0
        )
        .map(product => ({
          'Название товара': product.name,
          'Количество на базе': product.WarehouseProduct.quantity,
          'Закупочная цена': product.WarehouseProduct.price
        }))
        // Сортировка по названию товара
        .sort((a, b) => a['Название товара'].localeCompare(b['Название товара']));

    console.table(missingProducts);

    // 4. Какие товары, и в каком количестве имеются в отделе 3 магазина 102
    console.log('\n4. Товары в бакалейном отделе магазина 102:');
    const query4 = await Department.findOne({
      where: { name: 'Бакалейный' },
      include: [{
        model: Store,
        where: { number: 102 }
      }, {
        model: Product,
        through: {
          attributes: ['quantity', 'retail_price']
        }
      }]
    });

    if (query4) {
      const productsInBakaleya = query4.Products
          .map(product => ({
            'Товар': product.name,
            'Количество': product.DepartmentProduct.quantity,
            'Розничная цена': product.DepartmentProduct.retail_price
          }))
          // Сортировка по названию товара
          .sort((a, b) => a['Товар'].localeCompare(b['Товар']));
      console.table(productsInBakaleya);
    } else {
      console.log('Отдел не найден');
    }

    // 5. Список заведующих отделами магазина 103
    console.log('\n5. Заведующие отделами магазина 103:');
    const query5 = await Store.findOne({
      where: { number: 103 },
      include: [{
        model: Department,
        include: [{
          model: Manager
        }]
      }]
    });

    if (query5) {
      const managersInStore103 = query5.Departments
          .map(dept => ({
            'Название отдела': dept.name,
            'Заведующий': dept.Manager.manager_name
          }))
          // Сортировка по названию отдела (в этом запросе нет товаров)
          .sort((a, b) => a['Название отдела'].localeCompare(b['Название отдела']));
      console.table(managersInStore103);
    } else {
      console.log('Магазин не найден');
    }

    // 6. На каких базах, и в каких количествах есть товар "Сыр Российский"
    console.log('\n6. Складские запасы сыра "Российский":');
    const query6 = await Product.findOne({
      where: { name: 'Сыр Российский' },
      include: [{
        model: Warehouse,
        through: {
          attributes: ['quantity', 'price']
        }
      }]
    });

    if (query6) {
      const cheeseWarehouses = query6.Warehouses
          .map(warehouse => ({
            'Название базы': warehouse.name,
            'Название продукта': query6.name,
            'Количество': warehouse.WarehouseProduct.quantity,
            'Закупочная цена': warehouse.WarehouseProduct.price
          }))
          // Сортировка по названию базы (в этом запросе товар один - сыр)
          .sort((a, b) => a['Название базы'].localeCompare(b['Название базы']));
      console.table(cheeseWarehouses);
    } else {
      console.log('Товар не найден');
    }

  } catch (error) {
    console.error('Ошибка при выполнении запросов:', error);
  } finally {
    await sequelize.close();
  }
}

runQueries();