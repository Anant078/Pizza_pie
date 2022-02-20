
const Menu=require('../../models/menu')
function homeController(){

      return {

        //we use await method it is asynchoronous method use make below match as asynchoronous method 
        async index(req,res){

        const pizza_data_from_database = await Menu.find()
       // console.log(pizza_data_from_database)
           return res.render('home' , {pizzas:pizza_data_from_database})
        }
    }
}

module.exports=homeController