const { BasedPlatform } = require("../models/models");
const ApiError = require("../error/APIError");

class BaseController {
  async create(req, res) {
    const {
      Наименование,
      Мощность,
      Грузоподъемность,
      Скорость,
      Расход,
      Масса,
    } = req.body;
    const base = await BasedPlatform.create({
      Наименование,
      Мощность,
      Грузоподъемность,
      Скорость,
      Расход,
      Масса,
    });
    return res.json(base);
  }
  async getAll(req, res) {
    const base = await BasedPlatform.findAll();
    return res.json(base);
  }
  async getOne(req, res) {
    const { id } = req.params;
    const base = await BasedPlatform.findOne({
      where: { id },
    });
    return res.json(base);
  }
}

module.exports = new BaseController();
