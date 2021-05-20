const userController = require('../controller/userConroller')
const auth = require('../middleware/auth')
const cors = require('cors');
const routerInit =(app)=>{
app.use(cors());
    
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
    app.get('/userprofile',auth,userController().profile)
    app.get('/getusers',userController().allUser)

    app.get('/userlogout',auth,userController().logout)

    app.post('/register',userController().register)
    app.post('/login',userController().login)
}

module.exports = routerInit
