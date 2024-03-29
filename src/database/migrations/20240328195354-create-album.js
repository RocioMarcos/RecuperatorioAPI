'use strict';

module.exports = {
	async up(queryInterface, Sequelize) {
		await queryInterface.createTable('Albums', {
			id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				autoIncrement: true,
				primaryKey: true
			},

			nombre: {
				type: Sequelize.STRING,
				allowNull: false
			},
			
			duracion: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		});
	},
	async down(queryInterface, Sequelize) {
		await queryInterface.dropTable('Albums');
	}
};