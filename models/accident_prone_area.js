const Sequelize = require('sequelize');

module.exports = class AccidentProneArea extends Sequelize.Model{
	static init(sequelize){
		return super.init({
			id: {
				type: Sequelize.INTEGER,
				autoIncrement: false,
				primaryKey: true
			},
			spot_name:{
				type:Sequelize.STRING(100),
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
			modelName:'AccidentProneArea',
			tableName:'ACCIDENT_PRONE_AREA',
			paranoid:false,
			charset:'utf8',
			collate:'utf8_general_ci',
		});
	}
	static associate(db){
	}
};