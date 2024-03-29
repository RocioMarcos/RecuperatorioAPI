
module.exports = (sequelize, dataTypes) => {

	let alias = 'Album';

	let cols = {
		id: {
			type: dataTypes.BIGINT(11).UNSIGNED,
            autoincrement: true,
            primaryKey: true,
			allowNull: false
		}, 

		nombre: {
			type: dataTypes.STRING(45),
		},

		duracion: {
			type: dataTypes.BIGINT(11).UNSIGNED
		}
	}

	let config = {
		tableName: "albums",
        createdAt: false,
        updatedAt: false,
        deletedAt: false
	}

	const Album = sequelize.define(alias, cols, config);

	Album.associate = function(models) {
        Album.hasMany(models.Cancion, {
            as: "canciones",
            foreignKey: "album_id"
        })
    }

	return Album;
};