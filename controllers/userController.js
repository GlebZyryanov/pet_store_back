const ApiError = require("../error/APIError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User, Basket } = require("../models/models");
const { use } = require("../routes");

const generateJWT = (id, email, role) => {
  return jwt.sign({ id, email, role }, process.env.SECRET_KEY, {
    expiresIn: "24h",
  });
};


class UserController {
  async registration(req, res, next) {
    const { email, password, role } = req.body;

    if (!email || !password) {
      return next(ApiError.badRequest("Некорректный email или пароль!"));
    }
    const candidate = await User.findOne({ where: { email } });
    //если такой пользователь уже есть то выводим предупреждение
    if (candidate) {
      return next(ApiError.badRequest("Пользователь с таким email уже есть!"));
    } else {
      //или идем дальше
      const hashPassword = await bcrypt.hash(password, 5);
      const user = await User.create({ email, role, password: hashPassword });
      const basket = await Basket.create({ userId: user.id });
      const token = generateJWT(user.id, user.email, user.role);
      return res.json({ token });
    }
  }

  async login(req, res, next) {
    //в запросе требуем чтоб был пароль и емейл
    const { email, password } = req.body;
    //сразу делаем проверку, есть ли такой человек в базе
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return next(ApiError.badRequest("Пользователь с таким email уже есть!"));
    }
    let comparePassword = bcrypt.compareSync(password, user.password);
    if (!comparePassword) {
      return next(ApiError.badRequest("Неверный пароль!"));
    }
    const token = generateJWT(user.id, user.email, user.role);
    return res.json({ token });
  }

  async check(req, res, next) {
    const token = generateJWT(req.user.id, req.user.email,req.user.role)
    return res.json({token})
  }
}

module.exports = new UserController();
