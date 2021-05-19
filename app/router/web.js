const userController = require('../controller/userConroller')
const auth = require('../middleware/auth')
const routerInit =(app)=>{
 
    app.get('/',userController().index)
    app.get('/userprofile',auth,userController().profile)
    app.get('/userlogout',auth,userController().logout)
    app.post('/register',userController().register)
    app.post('/login',userController().login)
}

module.exports = routerInit
