
module.exports = (sequelize, dataTypes) => {

	let alias = 'Artista';

	let cols = {
		id: {
			type: dataTypes.BIGINT(11).UNSIGNED,
            autoincrement: true,
            primaryKey: true,
			allowNull: false
		}, 

		nombre: {
			type: dataTypes.STRING(255),
			allowNull: false
		},

		apellido: {
			type: dataTypes.STRING(255)
		}
	}

	let config = {
		tableName: "artistas", 
        createdAt: false,
        updatedAt: false,
        deletedAt: false
	}

	const Artista = sequelize.define(alias, cols, config);

	Artista.associate = function(models) {
        Artista.hasMany(models.Cancion, {
            as: "canciones",
            foreignKey: "artista_id"
        })
    }

	return Artista;
};
