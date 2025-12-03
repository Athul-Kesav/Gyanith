const { Sequelize, DataTypes, Model } = require("sequelize");
const sequelize = new Sequelize("db", "user", "pass", { dialect: "mysql" });

class WebsiteUser extends Model {}
WebsiteUser.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  phno: DataTypes.STRING,
  confirmed: { type: DataTypes.BOOLEAN, defaultValue: false },
  email: { type: DataTypes.STRING, unique: true },
  nitpy: { type: DataTypes.BOOLEAN, defaultValue: false },
  address: DataTypes.TEXT,
  roll_no: DataTypes.STRING,
  is_staff: { type: DataTypes.BOOLEAN, defaultValue: false },
  is_superuser: { type: DataTypes.BOOLEAN, defaultValue: false },
  date_joined: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  is_campus_ambassador: { type: DataTypes.BOOLEAN, defaultValue: false },
  referral_code: { type: DataTypes.STRING, unique: true }
}, { sequelize, modelName: "WebsiteUser" });

class Tier extends Model {}
Tier.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  tier_id: DataTypes.STRING,
  tier_name: DataTypes.STRING,
  tier_desc: DataTypes.STRING,
  tier_cost: DataTypes.DECIMAL(10,2),
  events: DataTypes.JSON
}, { sequelize, modelName: "Tier" });

WebsiteUser.belongsTo(Tier, { foreignKey: "tierId" });

class ClubData extends Model {}
ClubData.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  club_name: DataTypes.STRING,
  club_desc: DataTypes.TEXT,
  rulebook: DataTypes.STRING
}, { sequelize, modelName: "ClubData" });

class EventData extends Model {}
EventData.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  event_name: DataTypes.STRING,
  event_desc: DataTypes.TEXT,
  event_desc_short: DataTypes.TEXT,
  team_or_solo: DataTypes.ENUM("Team","Solo"),
  datetime_day1: DataTypes.DATE,
  datetime_day2: DataTypes.DATE,
  venue_day1: DataTypes.STRING,
  venue_day2: DataTypes.STRING,
  image: DataTypes.STRING,
  render: DataTypes.TEXT,
  leader_render: DataTypes.TEXT,
  reg_open: { type: DataTypes.BOOLEAN, defaultValue: true },
  is_online: { type: DataTypes.BOOLEAN, defaultValue: false },
  view_only: { type: DataTypes.BOOLEAN, defaultValue: false },
  nitpy_cost: DataTypes.DECIMAL(8,2),
  other_cost: DataTypes.DECIMAL(8,2),
  nitpy_quota: DataTypes.INTEGER,
  other_quota: DataTypes.INTEGER,
  certificate: DataTypes.STRING,
  cert_released: DataTypes.BOOLEAN,
  rulebook: DataTypes.STRING
}, { sequelize, modelName: "EventData" });

EventData.belongsTo(ClubData, { foreignKey: "clubId" });

class EventOrganiser extends Model {}
EventOrganiser.init({ id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true } }, { sequelize, modelName: "EventOrganiser" });
EventOrganiser.belongsTo(WebsiteUser, { foreignKey: "userId" });
EventOrganiser.belongsTo(EventData, { foreignKey: "eventId" });
EventOrganiser.belongsTo(ClubData, { foreignKey: "clubId" });

class ClubHead extends Model {}
ClubHead.init({ id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true } }, { sequelize, modelName: "ClubHead" });
ClubHead.belongsTo(WebsiteUser, { foreignKey: "userId" });
ClubHead.belongsTo(ClubData, { foreignKey: "clubId" });

class Admin extends Model {}
Admin.init({ id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true } }, { sequelize, modelName: "Admin" });
Admin.belongsTo(WebsiteUser, { foreignKey: "userId" });

class SuperAdmin extends Model {}
SuperAdmin.init({ id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true } }, { sequelize, modelName: "SuperAdmin" });
SuperAdmin.belongsTo(WebsiteUser, { foreignKey: "userId" });

class PaymentDetails extends Model {}
PaymentDetails.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  payment_id: DataTypes.STRING,
  amount: DataTypes.DECIMAL(10,2),
  verified: DataTypes.BOOLEAN,
  reason: DataTypes.STRING,
  transaction_id: { type: DataTypes.STRING, unique: true }
}, { sequelize, modelName: "PaymentDetails" });
PaymentDetails.belongsTo(WebsiteUser, { foreignKey: "userId" });

class EventReg extends Model {}
EventReg.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  team_id: DataTypes.STRING,
  team_name: DataTypes.STRING,
  post: { type: DataTypes.STRING, defaultValue: "member" },
  extras: DataTypes.JSON
}, { sequelize, modelName: "EventReg" });
EventReg.belongsTo(WebsiteUser, { foreignKey: "userId" });
EventReg.belongsTo(EventData, { foreignKey: "eventId" });
EventReg.belongsTo(PaymentDetails, { foreignKey: "paymentId" });

class ShopData extends Model {}
ShopData.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  title: DataTypes.STRING,
  desc: DataTypes.TEXT,
  image_url: DataTypes.STRING,
  nitpy_rate: DataTypes.DECIMAL(6,2),
  other_rate: DataTypes.DECIMAL(6,2),
  available: DataTypes.BOOLEAN
}, { sequelize, modelName: "ShopData" });

class ShopReg extends Model {}
ShopReg.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  size: DataTypes.STRING,
  quantity: DataTypes.INTEGER
}, { sequelize, modelName: "ShopReg" });
ShopReg.belongsTo(WebsiteUser, { foreignKey: "userId" });
ShopReg.belongsTo(ShopData, { foreignKey: "productId" });
ShopReg.belongsTo(PaymentDetails, { foreignKey: "paymentId" });

class WinnersList extends Model {}
WinnersList.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  position: DataTypes.INTEGER,
  released: DataTypes.BOOLEAN,
  bank_name: DataTypes.STRING,
  account_no: DataTypes.STRING,
  ifsc_code: DataTypes.STRING,
  aadhar_no: DataTypes.STRING,
  pan_no: DataTypes.STRING
}, { sequelize, modelName: "WinnersList", indexes: [{ unique: true, fields: ["userId","eventId","position"] }] });
WinnersList.belongsTo(WebsiteUser, { foreignKey: "userId" });
WinnersList.belongsTo(EventData, { foreignKey: "eventId" });

class BaseTemplate extends Model {}
BaseTemplate.init({
  template_name: { type: DataTypes.STRING, primaryKey: true },
  html_code: DataTypes.TEXT
}, { sequelize, modelName: "BaseTemplate" });

class Route extends Model {}
Route.init({
  route_name: { type: DataTypes.STRING, primaryKey: true },
  python_code: DataTypes.TEXT
}, { sequelize, modelName: "Route" });
Route.belongsTo(BaseTemplate, { foreignKey: "renderStringId" });

class ContactUs extends Model {}
ContactUs.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  email: DataTypes.STRING,
  name: DataTypes.STRING,
  message: DataTypes.TEXT,
  contacted_by_us: DataTypes.BOOLEAN
}, { sequelize, modelName: "ContactUs" });

class StringKV extends Model {}
StringKV.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  string_name: DataTypes.STRING,
  value: DataTypes.STRING
}, { sequelize, modelName: "String" });

class Hostel extends Model {}
Hostel.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  name: DataTypes.STRING,
  gender: DataTypes.ENUM("M","F"),
  day_1_quantity: DataTypes.INTEGER,
  day_2_quantity: DataTypes.INTEGER,
  day_3_quantity: DataTypes.INTEGER,
  day_4_quantity: DataTypes.INTEGER,
  rate: DataTypes.DECIMAL(6,2)
}, { sequelize, modelName: "Hostel" });

class AccommodationData extends Model {}
AccommodationData.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  day_1_count: DataTypes.INTEGER,
  day_2_count: DataTypes.INTEGER,
  day_3_count: DataTypes.INTEGER,
  day_4_count: DataTypes.INTEGER
}, { sequelize, modelName: "AccommodationData" });
AccommodationData.belongsTo(Hostel, { foreignKey: "hostelId" });

class AccommodationReg extends Model {}
AccommodationReg.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  gender: DataTypes.ENUM("M","F"),
  verified_accommodation: DataTypes.BOOLEAN,
  days_staying: DataTypes.JSON,
  check_in: DataTypes.DATE,
  checked_in: DataTypes.BOOLEAN,
  check_out: DataTypes.DATE,
  checked_out: DataTypes.BOOLEAN
}, { sequelize, modelName: "AccommodationReg" });
AccommodationReg.belongsTo(WebsiteUser, { foreignKey: "userId" });
AccommodationReg.belongsTo(Hostel, { foreignKey: "hostelId" });

class PaymentAccount extends Model {}
PaymentAccount.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  current: DataTypes.BOOLEAN,
  upi_id: DataTypes.STRING
}, { sequelize, modelName: "PaymentAccount" });

class FreeEvent extends Model {}
FreeEvent.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  hash_id: DataTypes.STRING,
  expired: DataTypes.BOOLEAN
}, { sequelize, modelName: "FreeEvent" });
FreeEvent.belongsTo(WebsiteUser, { foreignKey: "userId" });
FreeEvent.belongsTo(EventReg, { foreignKey: "workshopRegId" });

class IPLog extends Model {}
IPLog.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  ip_address: DataTypes.STRING,
  path: DataTypes.STRING,
  timestamp: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, { sequelize, modelName: "IPLog" });

class CA extends Model {}
CA.init({ id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true } }, { sequelize, modelName: "CA" });
CA.belongsTo(WebsiteUser, { foreignKey: "whoId", as: "who" });
CA.belongsTo(WebsiteUser, { foreignKey: "whomId", as: "whom" });

class Referrer extends Model {}
Referrer.init({ id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true } }, { sequelize, modelName: "Referrer" });
Referrer.belongsTo(WebsiteUser, { foreignKey: "whoId", as: "who" });
Referrer.belongsTo(WebsiteUser, { foreignKey: "whomId", as: "whom" });

class LiquidCash extends Model {}
LiquidCash.init({
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  qr_code: { type: DataTypes.STRING, unique: true },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  expired: DataTypes.BOOLEAN
}, { sequelize, modelName: "LiquidCash" });
LiquidCash.belongsTo(Tier, { foreignKey: "fromTierId", as: "from_tier" });
LiquidCash.belongsTo(Tier, { foreignKey: "upgradeTierId", as: "upgrade_tier" });

sequelize.sync();
