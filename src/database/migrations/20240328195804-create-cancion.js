'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Canciones', {
			id: {
				allowNull: false,
				autoIncrement: true,
				primaryKey: true,
				type: Sequelize.INTEGER
			},

			titulo: {
				type: Sequelize.STRING,
				allowNull: false,
			},

			duracion: {
				type: Sequelize.INTEGER
			},

			created_at: {
				allowNull: false,
				type: Sequelize.DATE
			},

			updated_at: {
				allowNull: false,
				type: Sequelize.DATE
			},

			genero_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "generos",
					},
					key: "id",
				},
				allowNull: false,
			},

			album_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "albums",
					},
					key: "id",
				},
				allowNull: false,
			},

			artista_id: {
				type: Sequelize.INTEGER,
				references: {
					model: {
						tableName: "artistas",
					},
					key: "id",
				},
				allowNull: false,
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Canciones');
	}
};