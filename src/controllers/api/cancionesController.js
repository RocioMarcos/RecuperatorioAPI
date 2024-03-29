
/* Models */
const db = require('../../database/models');
const Canciones = db.Cancion;
const Generos = db.Genero;
const Albums = db.Album;
const Artistas = db.Artista;

const cancionesController = {
    all: async (req, res) => {

        var resultado;
        var estado;

        try{
            let canciones = await Canciones.findAll({
                attributes:{
                    include:[
                        [db.sequelize.col('genero.name'), 'genero_nombre'],
                        [db.sequelize.col('album.nombre'), 'album_nombre'],
                        [db.sequelize.col('artista.nombre'), 'artista_nombre'],
                    ]
                },
                include:[{
                    model: Generos,
                    as: 'genero',
                    attributes: [],
                },{
                    model: Albums,
                    as: 'album',
                    attributes: [],
                },{
                    model: Artistas,
                    as: 'artista',
                    attributes: [],
                }]
            });
            
            resultado = JSON.parse(JSON.stringify(canciones));

            if(resultado && resultado[0] != undefined){

                estado = {
                    status: 200,
                    url: 'canciones/',
                    method: 'GET',
                    results: resultado.length
                }
    
            } else {

                resultado = "No se encontraron resultados";
                
                estado = {
                    status: 404,
                    url: 'canciones/',
                    method: 'GET'
                }
            }
            
            return res.json({
                meta: estado,
                data: resultado
            });
            
        } catch(error){
            res.send(error);
        }
    },


    create: async (req, res) => {

        var resultado;
        var estado;

        try{

            if(req.body.titulo && req.body.genero_id && req.body.album_id && req.body.artista_id != undefined){

                const buscarCancion = await Canciones.findAll({
                    where: {
                        titulo: req.body.titulo,
                        genero_id: req.body.genero_id,
                        album_id: req.body.album_id,
                        artista_id: req.body.artista_id,
                    },
                    order: [['id', 'DESC']],
                    limit: 1
                });
    
                let existe = JSON.parse(JSON.stringify(buscarCancion));
    
                if(existe && existe[0] != undefined){

                    resultado = "Ya existe un registro similar";
                    estado = {
                        status: 404,
                        url: 'canciones/',
                        method: 'POST'
                    }

                } else {

                    var nuevaCancion = await Canciones.create({
                        titulo: req.body.titulo,
                        duracion: req.body.duracion,
                        genero_id: req.body.genero_id,
                        album_id: req.body.album_id,
                        artista_id: req.body.artista_id,
                    });
    
                    if(nuevaCancion){
    
                        const ultimaCancion = await Canciones.findAll({
                            where: {
                                titulo: req.body.titulo,
                                genero_id: req.body.genero_id,
                                album_id: req.body.album_id,
                                artista_id: req.body.artista_id,
                            },
                            order: [['id', 'DESC']],
                            limit: 1
                        });
    
                        resultado = JSON.parse(JSON.stringify(ultimaCancion))[0];
            
                        if(resultado){
    
                            estado = {
                                status: 200,
                                url: 'canciones/',
                                method: 'POST'
                            }
                            
                        } else {
            
                            resultado = "No se encontraron resultados";
                            estado = {
                                status: 404,
                                url: 'canciones/'
                            }
                        }
            
                    } else {
                        resultado = "No se completó la escritura de información en la BD";
                        estado = {
                            status: 404,
                            url: 'canciones/',
                            method: 'POST'
                        }
                    }
                }
                
            } else {                
                resultado = "No se envió la información necesaria en el body";
                estado = {
                    status: 404,
                    url: 'canciones/',
                    method: 'POST'
                }    
            }
            
            return res.json({
                meta: estado,
                data: resultado
            });

        } catch(error) {

            res.send(error);

        };
    },


    show: async (req, res) => {

        const idCancion = req.params.id;
        var resultado;
        var estado;

        try{
            let cancion = await Canciones.findByPk(idCancion);

            resultado = JSON.parse(JSON.stringify(cancion));
        
            if(resultado){

                estado = {
                    status: 200,
                    url: 'canciones/' + idCancion,
                    method: 'POST'
                }
                
            } else {
                resultado = "No se encontraron resultados";
                estado = {
                    status: 404,
                    url: 'canciones/' + idCancion,
                }
            }

            return res.json({
                meta: estado,
                data: resultado
            });

        } catch(error){

            res.send(error);

        }
    },


    edit: async (req, res) => {

        const idCancion = req.params.id;
        var resultado;
        var estado;

        try{
            let cancion = await Canciones.findByPk(idCancion);
        
            if(cancion){

                let valoresPrevios = JSON.parse(JSON.stringify(cancion));

                /* Comprobar campos de body a modificar */
                var titulo_Valor = valoresPrevios.titulo;
                if(req.body.titulo){
                    tituloValor = req.body.titulo;
                }

                var duracion_Valor = valoresPrevios.duracion;
                if(req.body.duracion){
                    duracion_Valor = req.body.duracion;
                }

                var genero_id_Valor = valoresPrevios.genero_id;
                if(req.body.genero_id){
                    genero_id_Valor = req.body.genero_id;
                }

                var album_id_Valor = valoresPrevios.album_id;
                if(req.body.album_id){
                    album_id_Valor = req.body.album_id;
                }

                var artista_id_Valor = valoresPrevios.artista_id;
                if(req.body.artista_id){
                    artista_id_Valor = req.body.artista_id;
                }

                await Canciones.update({
                        titulo: titulo_Valor,
                        duracion: duracion_Valor,
                        genero_id: genero_id_Valor,
                        album_id: album_id_Valor,
                        artista_id: artista_id_Valor,
                    },{
                        where: {
                            id: idCancion
                        }
                });

                let actualizado = await Canciones.findOne({
                    where: {
                        id: idCancion,
                    }
                });

                resultado = JSON.parse(JSON.stringify(actualizado));

                if(resultado){
                    estado = {
                        status: 200,
                        url: 'canciones/' + idCancion,
                        method: 'PUT'
                    }
                } else {
                    resultado = "No se pudo actualizar el registro";
                    estado = {
                        status: 404,
                        url: 'canciones/' + idCancion,
                        method: 'PUT'
                    } 
                }
                
            } else {
                resultado = "No se encontraron resultados";
                estado = {
                    status: 404,
                    url: 'canciones/' + idCancion,
                    method: 'PUT'
                }
            }

            return res.json({
                meta: estado,
                data: resultado
            });

        } catch(error){
            console.log(error);
        }
    },


    destroy: async (req, res) => {

        const idCancion = req.params.id;
        var resultado;
        var estado;

        try{
            let cancion = await Canciones.findByPk(idCancion);
        
            if(cancion){

                resultado = JSON.parse(JSON.stringify(cancion));

                let borrada = await Canciones.destroy({
                    where: {
                        id: idCancion
                    },
                    force: true
                });

                if(borrada == 1){
                    estado = {
                        status: 200,
                        url: 'canciones/' + idCancion,
                        method: 'DELETE'
                    }
                } else {
                    resultado = "No se pudo eliminar el registro";
                    estado = {
                        status: 404,
                        url: 'canciones/' + idCancion,
                        method: 'DELETE'
                    } 
                }
                
            } else {
                resultado = "No se encontraron resultados";
                estado = {
                    status: 404,
                    url: 'canciones/' + idCancion,
                    method: 'DELETE'
                }
            }

            return res.json({
                meta: estado,
                data: resultado
            });

        } catch(error){

            res.send(error);

        }
    }
}

module.exports = cancionesController;