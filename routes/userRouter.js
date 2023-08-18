const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса
const userController = require("../controllers/userController");
const authMiddleware = require("../middleWare/authMiddleware");
router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", authMiddleware, userController.check);

module.exports = router;
