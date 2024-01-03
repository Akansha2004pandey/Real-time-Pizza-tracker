// model name menu then in database it should be menus
const mongoose=require('mongoose');
const Schema=mongoose.Schema
  //if this is capital letter then it has a class or a constructor function

const menuSchema=new Schema({
    name:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    size:{
        type:String,
        required:true
    }

})
const Menu=mongoose.model('Menu',menuSchema);
module.exports=Menu;