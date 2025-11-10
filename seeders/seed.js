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

async function seedDatabase() {
  try {
    // Включить foreign keys для SQLite
    await sequelize.query('PRAGMA foreign_keys = ON');
    
    // Синхронизация с базой данных
    await sequelize.sync({ force: true });
    console.log('База данных синхронизирована');

    // Создание менеджеров
    const managers = await Manager.bulkCreate([
      { manager_name: 'Иванов Алексей Петрович' },
      { manager_name: 'Смирнова Мария Ивановна' },
      { manager_name: 'Петров Дмитрий Сергеевич' },
      { manager_name: 'Козлова Анна Владимировна' },
      { manager_name: 'Сидоров Андрей Николаевич' },
      { manager_name: 'Федорова Елена Дмитриевна' }
    ]);

    // Создание магазинов
    const stores = await Store.bulkCreate([
      { class: 1, number: 101 },
      { class: 2, number: 102 },
      { class: 1, number: 103 },
      { class: 3, number: 104 },
      { class: 2, number: 105 }
    ]);

    // Создание складов
    const warehouses = await Warehouse.bulkCreate([
      { name: 'Центральный склад' },
      { name: 'Северный склад' },
      { name: 'Южный склад' }
    ]);

    // Создание товаров
    const products = await Product.bulkCreate([
      { name: 'Хлеб Бородинский' },
      { name: 'Молоко 2,5%' },
      { name: 'Сыр Российский' },
      { name: 'Яблоки Голден' },
      { name: 'Картофель' },
      { name: 'Колбаса Докторская' },
      { name: 'Чай Greenfield' },
      { name: 'Кофе Jacobs' },
      { name: 'Печенье Юбилейное' },
      { name: 'Шоколад Аленка' }
    ]);

    // Создание отделов
    const departments = await Department.bulkCreate([
      { store_id: stores[0].store_id, manager_id: managers[0].manager_id, name: 'Хлебобулочный' },
      { store_id: stores[0].store_id, manager_id: managers[1].manager_id, name: 'Молочный' },
      { store_id: stores[1].store_id, manager_id: managers[2].manager_id, name: 'Бакалейный' },
      { store_id: stores[2].store_id, manager_id: managers[3].manager_id, name: 'Мясной' },
      { store_id: stores[2].store_id, manager_id: managers[4].manager_id, name: 'Фруктово-овощной' },
      { store_id: stores[3].store_id, manager_id: managers[5].manager_id, name: 'Кондитерский' },
      { store_id: stores[4].store_id, manager_id: managers[0].manager_id, name: 'Бакалейный' },
      { store_id: stores[4].store_id, manager_id: managers[1].manager_id, name: 'Молочный' }
    ]);

    // Заполнение WarehouseProduct
    await WarehouseProduct.bulkCreate([
      { warehouse_id: warehouses[0].warehouse_id, product_id: products[0].product_id, quantity: 600, price: 35.00 },
      { warehouse_id: warehouses[0].warehouse_id, product_id: products[1].product_id, quantity: 500, price: 70.00 },
      { warehouse_id: warehouses[0].warehouse_id, product_id: products[2].product_id, quantity: 250, price: 270.00 },
      { warehouse_id: warehouses[0].warehouse_id, product_id: products[3].product_id, quantity: 1000, price: 100.00 },
      { warehouse_id: warehouses[1].warehouse_id, product_id: products[4].product_id, quantity: 1500, price: 38.00 },
      { warehouse_id: warehouses[1].warehouse_id, product_id: products[5].product_id, quantity: 300, price: 380.00 },
      { warehouse_id: warehouses[2].warehouse_id, product_id: products[6].product_id, quantity: 400, price: 155.00 },
      { warehouse_id: warehouses[2].warehouse_id, product_id: products[7].product_id, quantity: 250, price: 300.00 },
      { warehouse_id: warehouses[2].warehouse_id, product_id: products[8].product_id, quantity: 600, price: 80.00 },
      { warehouse_id: warehouses[0].warehouse_id, product_id: products[9].product_id, quantity: 450, price: 90.00 },
      { warehouse_id: warehouses[0].warehouse_id, product_id: products[6].product_id, quantity: 10, price: 50.00 }
    ]);

    // Заполнение DepartmentProduct
    await DepartmentProduct.bulkCreate([
      { department_id: departments[0].department_id, product_id: products[0].product_id, quantity: 80, retail_price: 43.00 },
      { department_id: departments[1].department_id, product_id: products[1].product_id, quantity: 60, retail_price: 82.00 },
      { department_id: departments[1].department_id, product_id: products[2].product_id, quantity: 25, retail_price: 320.00 },
      { department_id: departments[2].department_id, product_id: products[6].product_id, quantity: 0, retail_price: 190.00 },
      { department_id: departments[2].department_id, product_id: products[7].product_id, quantity: 35, retail_price: 365.00 },
      { department_id: departments[3].department_id, product_id: products[5].product_id, quantity: 20, retail_price: 460.00 },
      { department_id: departments[4].department_id, product_id: products[3].product_id, quantity: 120, retail_price: 125.00 },
      { department_id: departments[4].department_id, product_id: products[4].product_id, quantity: 200, retail_price: 47.00 },
      { department_id: departments[5].department_id, product_id: products[8].product_id, quantity: 70, retail_price: 98.00 },
      { department_id: departments[5].department_id, product_id: products[9].product_id, quantity: 55, retail_price: 120.00 },
      { department_id: departments[6].department_id, product_id: products[6].product_id, quantity: 40, retail_price: 188.00 },
      { department_id: departments[7].department_id, product_id: products[1].product_id, quantity: 50, retail_price: 83.00 }
    ]);

    console.log('Тестовые данные успешно добавлены в SQLite!');
    
  } catch (error) {
    console.error('Ошибка при заполнении базы данных:', error);
  } finally {
    await sequelize.close();
  }
}

seedDatabase();