const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса
const BaseController = require("../controllers/baseController");
const checkrole = require("../middleWare/checkRoleMiddleware");

router.post("/", checkrole("ADMIN"), BaseController.create);
router.get("/", BaseController.getAll);
router.get("/:id", BaseController.getOne);


module.exports = router;
