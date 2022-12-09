const express = require('express');
const { Router } = express;

const app = express();   

app.use(express.json()); 

const productRouter = Router(); 


app.use('/api/productos', productRouter);
app.use('/api/productos/:id', productRouter);

productRouter.get('/', (req, res) => {
    res.send(`GET All Products`);
});

productRouter.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`GET Product Id: ${id}`);
});

productRouter.post('/', (req, res) => {
    res.send("Request POST Add");
});

productRouter.put('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Request PUT Update Id: ${id}`);
});

productRouter.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Request DELETE Id: ${id}`);
});



const PORT = 8080;
app.listen(PORT, ()=> console.log(`Listening on port: ${PORT}`));
