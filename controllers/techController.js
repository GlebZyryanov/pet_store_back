const uuid = require("uuid");
const path = require("path");
const ApiError = require("../error/APIError");
const { Tech, BasedPlatform } = require("../models/models");

class TechController {

  async update(req, res,next) {
   try{
    const { name, year, price, brandId, typeId, basedPlatformId } = req.body;
    const tech = await Tech.update(
      {
        name,
        year,
        price,
        brandId,
        typeId,
        basedPlatformId,
      }
    )
    return res.json(tech);
   }catch(e){
    next(ApiError.badRequest(e.message));
   }
  }

  async create(req, res, next) {
    try {
      const { name, year, price, brandId, typeId, basedPlatformId} = req.body;
      const { img } = req.files;

      //генерация уникального имени для img
      let fileName = uuid.v4() + ".jpg";

      //1-й парам-р путь до текущ.папки, остальное переместим в файл fileName и папку static
      img.mv(path.resolve(__dirname, "..", "static", fileName));

      //создаем девайс и передаем в img НАЗВАНИЕ файла
      const tech = await Tech.create({
        name,
        year,
        price,
        brandId,
        typeId,
        basedPlatformId, 
        img: fileName,
      });

      return res.json(tech);
    } catch (e) {
      next(ApiError.badRequest(e.message));
    }
  }

  async getAll(req, res) {
    let { brandId, typeId, limit, page } = req.query;
    page = page || 1;
    limit = limit || 9;
    let offset = page * limit - limit;
    let Techs;
    if (!brandId && !typeId) {
      Techs = await Tech.findAndCountAll({ limit, offset });
    }
    if (brandId && !typeId) {
      Techs = await Tech.findAndCountAll({
        where: { brandId },
        limit,
        offset,
      });
    }
    if (!brandId && typeId) {
      Techs = await Tech.findAndCountAll({
        where: { typeId },
        limit,
        offset,
      });
    }
    if (brandId && typeId) {
      Techs = await Tech.findAndCountAll({
        where: { brandId, typeId },
        limit,
        offset,
      });
    }
    if (!brandId && !typeId) {
      Techs = await Tech.findAndCountAll({ limit, offset });
    }
    // if (!brandId && !typeId) {
    //   Techs = await Tech.findAndCountAll({ limit, offset });
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
    //   Techs = await Tech.findAndCountAll({  w, limit, offset  });
    // }
    return res.json(Techs);
  }

  async getOne(req, res) {
    const { id } = req.params;
    const tech = await Tech.findOne({
      where: { id },

    });
    return res.json(tech);
  }

 

}




module.exports = new TechController();
