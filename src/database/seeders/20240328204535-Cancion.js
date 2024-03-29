'use strict';

const { faker } = require("@faker-js/faker");
const db = require('../../database/models');
const Genero = db.Generos;
const Album = db.Albums;
const Artista = db.Artistas;

module.exports = {
	async up (queryInterface, Sequelize) {
		const generosTotal = await Genero.count();
		const albumsTotal = await Album.count();
		const artistasTotal = await Artista.count();
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
					genero_id: faker.number.int({ min: 1, max: generosTotal }),
					album_id: faker.number.int({ min: 1, max: albumsTotal }),
					artista_id: faker.number.int({ min: 1, max: artistasTotal })
				};
				canciones.push(randomAlbum);
		});
		
        await queryInterface.bulkInsert("canciones", canciones);
	},

	async down (queryInterface, Sequelize) {
		await queryInterface.bulkDelete('canciones', null, {});
	}
};
