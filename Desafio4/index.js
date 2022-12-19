// >> Consigna:
// Realizar un proyecto de servidor basado en node.js y express que ofrezca una API RESTful de productos.
// En detalle, que incorpore las siguientes rutas:
// GET '/api/productos' -> devuelve todos los productos.
// GET '/api/productos/:id' -> devuelve un producto según su id.
// POST '/api/productos' -> recibe y agrega un producto, y lo devuelve con su id asignado.
// PUT '/api/productos/:id' -> recibe y actualiza un producto según su id.
// DELETE '/api/productos/:id' -> elimina un producto según su id.


// # Para el caso de que un producto no exista, se devolverá el objeto: { error : 'producto no encontrado' }
// # Implementar la API en una clase separada, utilizando un array como soporte de persistencia en memoria.
// # Incorporar el Router de express en la url base '/api/productos' y configurar las subrutas en base a este.
// # Crear un espacio público de servidor que contenga un index.html con un formulario de ingreso de productos.
// # El servidor debe estar basado en express y debe implementar los mensajes de conexión al puerto 8080.
// # En caso de error, representar la descripción del mismo.
// # Las respuestas del servidor serán en formato JSON.
// # La funcionalidad será probada a través de Postman y del formulario de ingreso.

const { Router } = require("express");
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({extended: true}));

const productRouter = Router(); 

const arrayProduct= [];

app.use("/api/productos", productRouter);
app.use("/api/productos/:id", productRouter)

// GET request que retorna todo el array de productos en formato JSON.
productRouter.get('/', (req, res) => {
    res.json(arrayProduct);
});

// GET request que recibe ID para retornar el objeto que coincida con el ID indicado.
productRouter.get('/:id', (req, res) => {
    const { id } = req.params;                                          
    let objectById = arrayProduct.find(element => element.id == id);   
    if(objectById != undefined){                                        
        res.json(objectById);                                           
    } else {
        res.send("NOT FOUND");                                          
    }
});

// POST request que recibe en formato JSON las key de un nuevo producto a ser agregado.
// En nuevo ID para el producto es generado en este metodo tembien.
productRouter.post('/api/productos', (req, res) => {
    const { id,nombre,precio  } = req.body;                       
    const newId = arrayProduct.length + 1;                 
    const newObj = { id: newId, nombre: nombre, precio: precio }; 
    arrayProduct.push(newObj);                             
    res.json(newObj);                                        
});

// PUT request que actualiza un producto por su ID.
productRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const {  nombre, precio } = req.body;

    const indexObjet = arrayProduct.findIndex(element => element.id == id);
    if ( indexObjet != -1 ) {
        arrayProduct[indexObjet].nombre  = nombre;
        res.json(arrayProduct[indexObjet]);
    } else {
        res.send("NOT FOUND - NOT UPDATED"); 
    }
});

// DELETE request que borra el producto del ID indicado si existe.
productRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const indexObjet = arrayProduct.findIndex(element => element.id == id);    
    if ( indexObjet != -1 ) {                                                   
        const deletedProd = arrayProduct.splice(indexObjet, 1);                
        res.json(deletedProd);                                                  
    } else {
        res.send("NOT FOUND - NOT DELETED");                                    
    }
});

const PORT = 8080;
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));

