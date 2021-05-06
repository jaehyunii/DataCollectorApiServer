const Sequelize = require('sequelize');

module.exports = class ImageLocation extends Sequelize.Model{
	static init(sequelize){
		return super.init({
			filename:{
				type:Sequelize.STRING(80),
				allowNull:false,
			},
			longitude:{
				type:Sequelize.DOUBLE,
				allowNull:false,
			},
			latitude:{
				type:Sequelize.DOUBLE,
				allowNull:false,
			},
		},{
			sequelize,
			timestamps:false,
			underscored:false,
			modelName:'ImageLocation',
			tableName:'IMAGE_LOCATION',
			paranoid:false,
			charset:'utf8',
			collate:'utf8_general_ci',
		});
	}
	static associate(db){
		db.ImageLocation.belongsTo(db.User,{foreignKey:'userId',targetKey:'id'});
	}
};