const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const User = sequelize.define("user", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  email: {
    type: DataTypes.STRING,
    unique: true,
    primaryKey: false,
    autoIncrement: false,
  },
  password: { type: DataTypes.STRING, unique: false },
  role: { type: DataTypes.STRING, defaultValue: "USER" },
});

const Basket = sequelize.define("basket", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const BasketTech = sequelize.define("basket_tech", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});
const Tech = sequelize.define("tech", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  year: { type: DataTypes.INTEGER, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
});
const Brand = sequelize.define("brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});
const Type = sequelize.define("type", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
});

const BasedPlatform = sequelize.define("based_platform", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  Наименование: { type: DataTypes.STRING, unique: true, allowNull: false },
  Мощность: { type: DataTypes.INTEGER, allowNull: false },
  Грузоподъемность: { type: DataTypes.INTEGER, allowNull: false },
  Скорость: { type: DataTypes.INTEGER, allowNull: false },
  Расход: { type: DataTypes.INTEGER, allowNull: false },
  Масса: { type: DataTypes.INTEGER, allowNull: false },
});

const TypeBrand = sequelize.define("type_brand", {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
});

Type.belongsToMany(Brand, { through: TypeBrand }); //связь для связ.таблицы
Brand.belongsToMany(Type, { through: TypeBrand });

User.hasOne(Basket); //связь между юзером и корзиной
Basket.belongsTo(User);

Basket.hasMany(BasketTech); //связь между корзиной и баскеттек
BasketTech.belongsTo(Basket);

Tech.hasMany(BasketTech); //связь между тек и баскеттек
BasketTech.belongsTo(Tech);

Brand.hasMany(Tech); //связь между брендом и теком
Tech.belongsTo(Brand);

Type.hasMany(Tech); //связь между типом и теком
Tech.belongsTo(Type);

BasedPlatform.hasMany(Tech); //связь между базой и теком
Tech.belongsTo(BasedPlatform);

module.exports = {
  User,
  Basket,
  BasketTech,
  Tech,
  Brand,
  Type,
  BasedPlatform,
  TypeBrand,
};
