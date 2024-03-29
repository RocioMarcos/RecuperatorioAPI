'use strict';

const { faker } = require("@faker-js/faker");

module.exports = {
	async up (queryInterface, Sequelize) {
		const generos = [];

		Array(8)
			.fill(0)
			.forEach((_, i) => {        
				const randomGenero = {
					id: i + 1,
					name: faker.music.genre(),
				};
				generos.push(randomGenero);
		});
		
        await queryInterface.bulkInsert("generos", generos);
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('generos', null, {});
	}
};
