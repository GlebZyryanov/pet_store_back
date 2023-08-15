const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const { Device } = require("../models/models");

class DeviceController {
  async create(req, res, next) {
    try {
      const { name, price, brandId, typeId, info } = req.body;
      const { img } = req.files;

      //генерация уникального имени для img
      let filenName = uuid.v4() + ".jpg";

      //1-й парам-р путь до текущ.папки, остальное переместим в файл fileName и папку static
      img.mv(path.resolve(__dirname, "..", "static", filenName));

      //создаем девайс и передаем в img НАЗВАНИЕ файла
      const device = await Device.create({
        name,
        price,
        brandId,
        typeId,
        img: filenName,
      });

      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    const { brandId, typeId } = req.query;
    let devices;

    if (!brandId && !typeId) {
      devices = await Device.findAll();
    } else {
      const where = {};
      if (brandId) {
        where.brandId = brandId;
      }
      if (typeId) {
        where.typeId = typeId;
      }
      devices = await Device.findAll({ where });
    }
    return res.json(devices);
  }

  async getOne(req, res) {}
}

module.exports = new DeviceController();
