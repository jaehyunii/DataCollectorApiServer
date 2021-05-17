const Sequelize = require('sequelize');

module.exports = class Video extends Sequelize.Model{
	static init(sequelize){
		return super.init({
			filename:{
				type:Sequelize.STRING(80),
			},
		},{
			sequelize,
			timestamps:false,
			underscored:false,
			modelName:'Video',
			tableName:'VIDEO',
			paranoid:false,
			charset:'utf8',
			collate:'utf8_general_ci',
		});
	}
	static associate(db){
		db.Video.belongsTo(db.User,{foreignKey:'userId',targetKey:'id'});
		db.Video.hasMany(db.ImageLocation,{foreignKey:'videoId',sourceKey:'id'});
	}
};
