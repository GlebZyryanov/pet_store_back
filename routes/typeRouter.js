const express = require('express') //получаем класс роутера из библиотеки
const router = express.Router(); //вызываем обьект класса
const TypeController = require('../controllers/typeController')

router.post('/',TypeController.create)
router.get('/',TypeController.getAll)
//далее добавить router.delete для удаления

module.exports = router;