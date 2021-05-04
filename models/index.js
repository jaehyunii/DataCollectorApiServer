const Sequelize = require('sequelize');
const User = require('./user');
const ImageLocation = require('./image_location');
const AccidentProneArea = require('./accident_prone_area');

const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

const sequelize = new Sequelize(config.database,config.username,config.password,config)

db.sequelize = sequelize;


db.User=User;
db.ImageLocation=ImageLocation;
db.AccidentProneArea=AccidentProneArea;


//init
User.init(sequelize);
ImageLocation.init(sequelize);
AccidentProneArea.init(sequelize);

//associate
User.associate(db);
ImageLocation.associate(db);
AccidentProneArea.associate(db);


module.exports = db;