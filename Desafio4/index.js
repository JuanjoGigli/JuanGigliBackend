

const express = require('express');             // Uso de la libreria Express.
const { Router } = express;                     // Uso de paquete de Rutas de Express.

const app = express();                          // Instancia del servidor.

app.use(express.json());                        // JSON format para el req.body
app.use(express.static('public'));              // Uso de carpeta public como raiz para archivo Index.html
app.use(express.urlencoded({extended: true}));

const apiProductRouter = Router();  
const htmlProductRouter = Router(); 

const ContenedorArchivo = require('./contenedorArchivo'); 

const fileProducts = new ContenedorArchivo('productos');      

let arrayProducts = fileProducts.getAll();                    


// Defino las rutas de acceso.
app.use('/api/productos', apiProductRouter);
app.use('/api/productos/:id', apiProductRouter);


// GET request que retorna todo el array de productos en formato JSON.
apiProductRouter.get('/', (req, res) => {
    res.json(arrayProducts);
});


// GET request que recibe ID para retornar el objeto que coincida con el ID indicado.
apiProductRouter.get('/:id', (req, res) => {
    const { id } = req.params;                                          
    let objectById = arrayProducts.find(element => element.id == id);   
    if(objectById != undefined){                                        
        res.json(objectById);                                           
    } else {
        res.send("NOT FOUND");                                          
    }
});


// POST request que recibe en formato JSON las key de un nuevo producto a ser agregado.
// En nuevo ID para el producto es generado en este metodo tembien.
apiProductRouter.post('/', (req, res) => {
    const { name, precio } = req.body;                       
    const newId = arrayProducts.length + 1;                 
    const newObj = { id: newId, name: name, precio: precio }; 
    arrayProducts.push(newObj);                             
    res.json(newObj);                                       
});


// PUT request que actualiza un producto por su ID.
apiProductRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    const { name, precio } = req.body;

    const indexObjet = arrayProducts.findIndex(element => element.id == id);
    if ( indexObjet != -1 ) {
        arrayProducts[indexObjet].name  = name;
        arrayProducts[indexObjet].precio = precio;
        res.json(arrayProducts[indexObjet]);
    } else {
        res.send("NOT FOUND - NOT UPDATED"); 
    }
});


// DELETE request que borra el producto del ID indicado si existe.
apiProductRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    const indexObjet = arrayProducts.findIndex(element => element.id == id);    
    if ( indexObjet != -1 ) {                                                   
        const deletedProd = arrayProducts.splice(indexObjet, 1);                
        res.json(deletedProd);                                                  
    } else {
        res.send("NOT FOUND - NOT DELETED");                                    
    }
});


// Inicio la escucha del servidor.
const PORT = 8082;
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));