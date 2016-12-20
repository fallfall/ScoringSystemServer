const mongo = require('./../config/mongo');

const Shop = mongo.model('shop', {
  username: { type: String },  // 用户名
  password: { type: String }, // 密码
  shop_name: { type: String }, // 店铺名称
  shop_type: { type: String }, // 商店类型，'shop' 为普通商店；'manager' 为商店管理员
  discount: { type: Number }, // 折扣，0-100
  reduction: { type: Object }, // 满减， { full: 100, minus: 50 }
  offers_type: { type: String }, // 优惠类型，discount/reduction
});


module.exports = Shop;
