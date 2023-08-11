const express = require('express') //получаем класс роутера из библиотеки
const BrandController = require('../controllers/brandController')
const router = express.Router(); //вызываем обьект класса

router.post('/',BrandController.create)
router.get('/',BrandController.getAll)
//далее добавить router.delete для удаления брендов

module.exports = router;