'use strict';

const { faker } = require("@faker-js/faker");

module.exports = {
	async up (queryInterface, Sequelize) {
		const albums = [];
		
		Array(20)
			.fill(0)
			.forEach((_, i) => {        
				const randomAlbum = {
					id: i + 1,
					nombre: faker.music.songName(1) + ' ' + faker.lorem.words({ min: 1, max: 4 }),
					duracion: faker.number.bigInt({ min: 100, max: 1999999999 }),
				};
				albums.push(randomAlbum);
		});
		
        await queryInterface.bulkInsert("albums", albums);
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('albums', null, {});
	}
};
