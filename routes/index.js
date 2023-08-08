const express = require("express"); //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса

const deviceRouter = require("./deviceRouter");
const brandRouter = require("./brandRouter");
const typeRouter = require("./typeRouter");
const userRouter = require("./userRouter");

router.use("/user", userRouter);
router.use("/type", typeRouter);
router.use("/device", deviceRouter);
router.use("/brand", brandRouter);

module.exports = router;
