const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса
const userController = require("../controllers/userController");

router.post("/registration", userController.registration);
router.post("/login", userController.login);
router.get("/auth", userController.check);

module.exports = router;
