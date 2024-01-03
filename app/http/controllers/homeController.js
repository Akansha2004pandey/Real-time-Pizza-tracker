const Menu=require('../../models/menu');



function homeController(){
    //factory functions
    //programming pattern which is used in almost all programming languages 
    return {
        //crud controller
        //create read update delete
        async index(req, res) {     //asynchronous function 
            try {
                const pizzas = await Menu.find();
                res.render('home',{pizzas:pizzas});
            } catch (error) {
                console.error(error);
                return res.status(500).send('Server Error');
            }
        }
        
    }
}
module.exports=homeController;