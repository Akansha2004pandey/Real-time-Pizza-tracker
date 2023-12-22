const express=require("express")
const app=express()
const ejs=require("ejs");
const expressLayout=require("express-ejs-layouts");
const path=require("path")
var PORT;
if(process.env.PORT){
    PORT=process.env.PORT
}else{
    PORT=3000
}
//route
app.get('/',function(req,res){
    res.render('home');
})
// set template engine
app.use(expressLayout);
app.set("views",path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');
app.listen(PORT,()=>{
    console.log('listening to port' + PORT );
})

// this port is available on our local machine but it might be possible that this portis not available when we are deploying it on our local machine
//if port is running or busy then use another port
