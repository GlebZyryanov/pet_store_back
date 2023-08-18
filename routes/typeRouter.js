const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса
const TypeController = require("../controllers/typeController");
const checkrole = require("../middleWare/checkRoleMiddleware");

router.post("/", checkrole("ADMIN"), TypeController.create);
router.get("/", TypeController.getAll);
//далее добавить router.delete для удаления

module.exports = router;
