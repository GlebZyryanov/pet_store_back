const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса
const TechController = require("../controllers/techController");
const checkrole = require("../middleWare/checkRoleMiddleware");
router.post("/", checkrole("ADMIN"), TechController.create);
router.post("/",checkrole("ADMIN"), TechController.update);
router.get("/", TechController.getAll);
router.get("/:id", TechController.getOne);


module.exports = router;
