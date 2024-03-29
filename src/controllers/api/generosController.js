
/* Models */
const db = require('../../database/models');
const Generos = db.Genero;
const Canciones = db.Cancion;

const generosController = {
    list: async (req, res) => {

        var resultado;
        var estado;

        try{

            resultados = await Generos.findAll({
                include: ['canciones']
            })

            resultado = JSON.parse(JSON.stringify(resultados));

            if(resultado && resultado[0] != undefined){

                estado = {
                    status: 200,
                    url: 'generos/',
                    method: 'GET',
                    results: resultado.length
                }
    
            } else {

                resultado = "No se encontraron resultados";
                
                estado = {
                    status: 404,
                    url: 'generos/',
                    method: 'GET'
                }
            }
            
            return res.json({
                meta: estado,
                data: resultado
            });

        } catch(error) {

            res.send(error);

        }

    }
}

module.exports = generosController;