import Sequelize from 'sequelize' //thư viện này tách làm 3 môi trường tại cofnigs.js
//tạo để kết nối database

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('project_nodejs', 'root', null, {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});


//test
const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

export default connection