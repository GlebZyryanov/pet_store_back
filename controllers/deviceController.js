const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/ApiError");
const { Device, Device_info } = require("../models/models");

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

      //если info есть, если он передан
      //то нужно распарисить его для бэка в json файл(т.к. приходят они в виде строки)
      if (info) {
        info = JSON.parse(info);
        info.forEach((i) =>
          Device_info.create({
            title: i.title,
            description: i.description,
            deviceId: device.id,
          })
        );
      }
      return res.json(device);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let devices;
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      devices = await Device.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    if (!brandId && !typeId) {
      devices = await Device.findAndCountAll({ limit, offset });
    }
    // if (!brandId && !typeId) {
    //   devices = await Device.findAndCountAll({ limit, offset });
    // } else {
    //   const w = {};
    //   if (brandId) {
    //     w.brandId = brandId;
    //     w.limit = limit;
    //     w.offset = offset;
    //   }
    //   if (typeId) {
    //     w.typeId = typeId;
    //     w.limit = limit;
    //     w.offset = offset;
    //   }
    //   devices = await Device.findAndCountAll({  w, limit, offset  });
    // }
    return res.json(devices);
  }

  async getOne(req, res) {
    const { id } = req.params;

    const device = await Device.findOne({
      where: { id },
      include: [{ model: Device_info, as: "info" }],
    });
    return res.json(device);
  }
}

module.exports = new DeviceController();
