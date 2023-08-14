const ApiError = require("../error/ApiError");

class UserController {
  async registration(req, res) {}
  async login(req, res) {}
  async check(req, res, next) {
    try{
      const {id} = req.query;
    if (!id) {
      return next(ApiError.badRequest("Не задан id!"));
    }
    res.json(id);
  }catch(e){
    next(ApiError.badRequest(e.message))
  }
    }
}

module.exports = new UserController();
