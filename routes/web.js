const homeController=require('../app/http/controller/homeController')
const authController=require('../app/http/controller/authController')
const cartController=require('../app/http/controller/cartController')
const orderController = require('../app/http/controller/orderController')
const guest = require('../app/http/middleware/guest')
const auth = require('../app/http/middleware/auth')
const AdminOrderController = require('../app/http/controller/admin/orderController')
function initRoutes(app){
app.get('/' , homeController().index)
app.get('/login' ,guest , authController().login)
app.post('/login' , authController().postLogin)
app.get('/register' , guest, authController().register)
app.post('/register',authController().postRegister)
app.post('/logout' , authController().logout)
app.get('/cart' , cartController().index)
app.post('/update-cart',cartController().update)

// customer route
app.post('/orders',auth,orderController().store)
app.get('/customer/orders',auth,orderController().index )

// admin route

app.get('/admin/orders',auth, AdminOrderController().index )
}

module.exports = initRoutes;