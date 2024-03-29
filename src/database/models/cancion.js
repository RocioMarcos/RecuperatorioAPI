
module.exports = (sequelize, dataTypes) => {

	let alias = 'Cancion';

	let cols = {
		id: {
			type: dataTypes.BIGINT(11).UNSIGNED,
            autoincrement: true,
            primaryKey: true,
			/* allowNull: false */
		}, 

		titulo: {
			type: dataTypes.STRING(255),
            allowNull: false
		},

		duracion: {
			type: dataTypes.BIGINT(11).UNSIGNED,
			default: null
		},

		genero_id: {
			type: dataTypes.BIGINT(11),
            allowNull: false
		},

		album_id: {
			type: dataTypes.BIGINT(11),
            allowNull: false
		},

		artista_id: {
			type: dataTypes.BIGINT(11),
            allowNull: false
		}
	}

	let config = {
		tableName: "canciones", 
		timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
	}

	const Cancion = sequelize.define(alias, cols, config);

	Cancion.associate = function(models) {
        Cancion.belongsTo(models.Genero, {
            as: "genero",
            foreignKey: "genero_id"
        })
        
        Cancion.belongsTo(models.Album, {
            as: "album",
            foreignKey: "album_id"
        })

		Cancion.belongsTo(models.Artista, {
            as: "artista",
            foreignKey: "artista_id"
        })
    }

	return Cancion;
};
