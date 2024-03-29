const express = require('express');
const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }));

var cancionesRouter = require('./routes/api/canciones');
var generosRouter = require('./routes/api/generos');

app.use('/canciones', cancionesRouter);
app.use('/generos', generosRouter);


/* Servidor local */
const PORT = 3031;
app.listen(PORT, () =>
    console.log(`\n¡Up!\nListo para usar en: http://127.0.0.1:${PORT}\n`)
);

module.exports = app;