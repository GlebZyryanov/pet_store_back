const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса

const techRouter = require("./techRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");
const userRouter = require("./userRouter");
const baseRouter = require("./baseRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/tech", techRouter);
router.use("/brand", brandRouter);
router.use("/base", baseRouter);
module.exports = router;
