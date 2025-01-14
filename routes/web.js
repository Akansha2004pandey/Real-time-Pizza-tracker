const homeController=require('../app/http/controllers/homeController')
const authController=require('../app/http/controllers/authController')
const cartController=require('../app/http/controllers/customers/cartController')
const orderController=require('../app/http/controllers/customers/orderController')
function initRoutes(app){  
      //received Parameter
      
    app.get('/',homeController().index)
    app.get('/cart',cartController().index);
    app.get('/login',authController().login);
    app.post('/login',authController().postLogin);
    app.get('/register',authController().register);
    app.post('/register',authController().postRegister);
    app.post('/update-cart',cartController().update);
    app.post('/orders',orderController().store);

}
module.exports=initRoutes;