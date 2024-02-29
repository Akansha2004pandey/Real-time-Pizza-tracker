const User=require('../../models/user');
const bcrypt=require('bcrypt')
function authController(){
    return{
        login(req,res){
            res.render('auth/login');
        },
        register(req,res){
            res.render('auth/register');
        },
        async postRegister(req,res){
            const{name,email, password }=req.body;
            //validate request
            if(!name || !email || !password){
                req.flash('error','All fields are required')
                req.flash('name', name)
                req.flash('email',email)
                return res.redirect('/register');
            }
            //flash message is stored for single message 
            // check if email exists
            User.exists({email: email},(err,result)=>{
                  if(result){
                    req.flash('error','email already taken')
                    req.flash('name', name)
                    req.flash('email',email)
                    return res,redirect('/register') 
                  }
            })
            //hash password
            // flash messages are obtained in messages folder 
            //we need a package 
            const hashedPassword=await hash(password,10)
            const user=new User({
                name:name,
                email:email,
                password:hashedPassword
            })
            user.save.then(()=>{
                //login 
                  return res.redirect('/');
            }).catch(err=>{
                req.flash('error','something went wrong')
               
                return res.redirect('/register') 
            })
            console.log(req.body);
        }
    }
}
module.exports=authController;