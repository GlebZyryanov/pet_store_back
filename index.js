require("dotenv").config();
const express = require('express'); 
const sequelize = require('./db');
const models = require('./models/models');
const cors = require('cors');
const PORT = process.env.PORT || 5000; //настройка порта

const app = express(); //вызов сервера
app.use(cors());
app.use(express.json()); //передаем в функцию use express.json для того чтобы приложение могло парсить json формат



//функция для подключения к базе данных
const start = async () => {
  try {
    await sequelize.authenticate(); //эта функция устанавливает подключение к бд
    await sequelize.sync(); // эта функция сверяет состояние бд со схемой бд
    app.listen(PORT, () => console.log(`server starts on port ${PORT}`));
  } catch (e) {
    console.log(e);
  }
};

start();
