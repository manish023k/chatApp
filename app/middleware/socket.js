const { Socket } = require('socket.io');
const User = require('../models/user')

const socketAuth = async (socket,next)=>{

  try {
    const socketToken = socket.handshake.query.token
    if(!socketToken)
    {
        next(new Error("socket token Invalid"))
    }
    const decode= await jwt.verify(socketToken, process.env.AUTH_SECRET);

    console.log(decode)
    const user = User.findOne({_id:decode._id,'tokens.token' : socketToken }).lean()
    if(user){

        socket.id = user._id
        next()
    }


      
  } catch (error) {
   
    next(new Error("socket token Invalid"))
  }
}

module.exports = socketAuth
