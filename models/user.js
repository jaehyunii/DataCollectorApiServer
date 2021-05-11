const Sequelize = require('sequelize');

module.exports = class User extends Sequelize.Model{
	static init(sequelize){
		return super.init({
			loginId:{
				type:Sequelize.STRING(30),
				allowNull:false,
				unique:true,
			},
			password:{
				type:Sequelize.STRING,
				allowNull:false,
			},
		},{
			sequelize,
			timestamps:false,
			underscored:false,
			modelName:'User',
			tableName:'user',
			paranoid:false,
			charset:'utf8',
			collate:'utf8_general_ci',
		});
	}
	static associate(db){
		db.User.hasMany(db.ImageLocation,{foreignKey:'userId',sourceKey:'id'});
		db.User.hasMany(db.Video,{foreignKey:'userId',sourceKey:'id'});
	}
};
