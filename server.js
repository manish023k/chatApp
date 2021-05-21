const mongoose = require('mongoose')
const express = require('express'), http = require('http');

var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server,{cors: {
    origin: '*',
  }});


const port = process.env.PORT || 8000
const socketAuth = require('./app/middleware/socket.js')
const url = 'mongodb://127.0.0.1:27017/chatapplication';
let usersConnected = {}

//set application to accept the form data
// app.use(express.urlencoded({extended:false}))
app.use(express.json())

//connection with the mongodb server
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }).then(() => {
    console.log("connecting succesfully...")
}).catch((err) => console.log(err))

const routerInit = require('./app/router/web')
routerInit(app);

io.use(socketAuth)
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect',()=>{
        console.log("a user disconnected");
//         Object.keys(usersConnected).forEach(key => {
//             if (usersConnected[key] == socket.id) delete usersConnected[key];
//         })
        io.emit('updateUserList',io.sockets.clients());
    });
    socket.on('loggedin',(user)=>{
        usersConnected[user._id] = socket.id.toString();
        io.emit('updateUserList',io.sockets.clients());
    })
    socket.on('chatMessage', function(data){
//         console.log(data.receiver)
        socket.to(usersConnected[data.receiver]).emit('message', data);
     });
    
  });



server.listen(port, () => {
    console.log(`app running on the port: ${port}`)
})


