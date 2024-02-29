require("dotenv").config();
const express=require("express")
const app=express()
const ejs=require("ejs");
const expressLayout=require("express-ejs-layouts");
const path=require("path")
const mongoose=require('mongoose');
const session=require("express-session");
const flash=require("express-flash");
const connectMongo= require('connect-mongo');
const MongoStore = connectMongo(session);
const passport=require('passport');


//database connection


mongoose.connect("mongodb://127.0.0.1:27017/pizza");

const connection = mongoose.connection;


connection.on('error', err => {
    console.error('Connection error:', err);
});

connection.once('open', () => {
    console.log('Database connected...');
});
//passport config

//session config 
//session store

let mongoStore=new MongoStore(
    {   
        mongooseConnection:connection,
        collection:"sessions"
    }
)

app.use(session({
    secret:process.env.COOKIE_SECRET,
    resave:false,
    saveUninitialized:false,
    store:mongoStore,
    cookie:{maxAge: 1000*60*60*24}
        //cookie kab tak active rehni chahiye // ye 24 hours hai 

    //sessions do not work without cookie usually env file is created and variables are stored inside that
    
}))
const passportInit=require('./app/config/passport')
passportInit(passport);
app.use(passport.initialize())
app.use(passport.session())
app.use(flash());
var PORT;
if(process.env.PORT){
    PORT=process.env.PORT
}else{
    PORT=3000
}
//route
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// set template engine
//Global middleware 
app.use((req,res,next)=>{
    res.locals.session=req.session;
    next();

})
app.use(expressLayout);
app.set("views",path.join(__dirname,'/resources/views'));
app.set('view engine','ejs');

require('./routes/web')(app)



app.listen(PORT,()=>{
    console.log('listening to port' + PORT );
})


// this port is available on our local machine but it might be possible that this portis not available when we are deploying it on our local machine
//if port is running or busy then use another port
