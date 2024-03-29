'use strict';

const { faker } = require("@faker-js/faker");

module.exports = {
	async up (queryInterface, Sequelize) {
		const artistas = [];

		Array(15)
			.fill(0)
			.forEach((_, i) => {        
				const randomArtista = {
					id: i + 1,
					nombre: faker.person.firstName(),
					apellido: faker.person.lastName()
				};
				artistas.push(randomArtista);
		});
		
        await queryInterface.bulkInsert("artistas", artistas);

	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('artistas', null, {});
	}
};
