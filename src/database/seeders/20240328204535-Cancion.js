'use strict';

const { faker } = require("@faker-js/faker");

module.exports = {
	async up (queryInterface, Sequelize) {
		const canciones = [];
		
		Array(50)
			.fill(0)
			.forEach((_, i) => {        
				const randomAlbum = {
					id: i + 1,
					titulo: faker.music.songName(),
					duracion: faker.number.int({ min: 100, max: 999999998 }),
					created_at: faker.date.between({ from: '1850-01-01T00:00:00.000Z', to: '2024-03-28T00:00:00.000Z' }),
					updated_at: 0,
					genero_id: faker.number.int({ min: 1, max: 8 }),
					album_id: faker.number.int({ min: 1, max: 20 }),
					artista_id: faker.number.int({ min: 1, max: 15 })
				};
				canciones.push(randomAlbum);
		});
		
        await queryInterface.bulkInsert("canciones", canciones);
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('canciones', null, {});
	}
};
