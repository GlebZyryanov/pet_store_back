const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса
const DeviceController = require("../controllers/deviceController");
const checkrole = require("../middleWare/checkRoleMiddleware");
router.post("/", checkrole("ADMIN"), DeviceController.create);
router.get("/", DeviceController.getAll);
router.get("/:id", DeviceController.getOne);
//далее добавить router.delete для удаления брендов

module.exports = router;
