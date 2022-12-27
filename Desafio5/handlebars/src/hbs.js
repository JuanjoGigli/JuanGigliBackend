const express = require('express');
const { engine } = require('express-handlebars');

const path = require ('path'); 

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${path.join(__dirname, `../public`)}`));


const ContenedorArchivo = require('../api/contenedorArchivo.js');  
const fileProducts = new ContenedorArchivo('productos');            
let arrayProducts = fileProducts.getAll();                          

//--------------------------------------------

app.set("view engine", "hbs");
app.set("views", `${path.join(__dirname, `../views`)}`);

app.engine(
    'hbs',
    engine({
        extname: ".hbs",
        defaultLayout: 'index.hbs',
    })
);

//--------------------------------------------

app.post('/productos', (req, res) => {
    const producto = req.body;
    const newId = arrayProducts.length + 1;
    const newObj = { id: newId, ...producto };
    arrayProducts.push(newObj);
    res.redirect('/');
});

app.get('/productos', (req, res) => {
    
    res.render("vista", {
        productos: arrayProducts,
        hayProductos: arrayProducts.length
    });
});

//--------------------------------------------

const PORT = 8081;
const server = app.listen(PORT, () => {
    console.log(`Servidor http Plantilla Handlebars escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));
