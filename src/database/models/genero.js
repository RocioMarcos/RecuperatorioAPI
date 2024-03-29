
module.exports = (sequelize, dataTypes) => {
	let alias = 'Genero';
	let cols = {
		id: {
			type: dataTypes.BIGINT(11).UNSIGNED,
            autoincrement: true,
            primaryKey: true,
			allowNull: false
		}, 
		name: {
			type: dataTypes.STRING,
            allowNull: false
		},
	}
	let config = {
		tableName: "generos",
        createdAt: false,
        updatedAt: false,
        deletedAt: false
	}
	const Genero = sequelize.define(alias, cols, config);
	Genero.associate = function(models) {
        Genero.hasMany(models.Cancion, {
            as: "canciones",
            foreignKey: "genero_id"
        })
    }
	return Genero;
};