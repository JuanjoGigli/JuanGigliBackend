
const express = require('express');
const { createServer } = require('http');
const socketIo = require('socket.io');

const path = require ('path');  

const app = express();
const server = createServer(app);
const io = socketIo(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${path.join(__dirname, `../public`)}`));

const ContenedorArchivo = require('../api/contenedorArchivo.js');   
const fileProducts = new ContenedorArchivo('productos');           
let arrayProducts = fileProducts.getAll();                         

const chatLog = new ContenedorArchivo('chatLog');

//--------------------------------------------

const messages = [
  { user: "Chat-Bot", time: "", text: "¡Bienvenido! Chat Global envie su mensaje..." }
];

messages[0].time = getTime();

io.on('connection', client => {
  console.log(`Client ${client.id} connected`);

  client.emit('messages', messages);
  client.emit('products', arrayProducts);

  client.on('new-message', message => {

    let now = getTime();
    const newMsg = { time: now, ...message };
    messages.push(newMsg);

    chatLog.saveChat(messages);

    io.sockets.emit('message-added', newMsg);
  });


  client.on('new-product', message => {
    const newId = arrayProducts.length + 1;
    const newObj = { id: newId, ...message };
    arrayProducts.push(newObj);

    io.sockets.emit('product-added', newObj);
  });

});

function getTime(){
  var currentdate = new Date(); 
  var datetime =  currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear() + " @ "  
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
  return datetime;
}

const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor http WebSocket escuchando en el puerto ${server.address().port}`);
});
server.on("error", error => console.log(`Error en servidor ${error}`));