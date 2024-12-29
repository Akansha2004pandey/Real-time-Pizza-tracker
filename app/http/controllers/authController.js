const User=require('../../models/user');
const passport=require('passport');
const bcrypt=require('bcrypt')
function authController(){
    return{
        login(req,res){
            res.render('auth/login');
        },
        postLogin(req,res,next){
            const { email, password }   = req.body;
            // Validate request 
             if(!email || !password) {
                 req.flash('error', 'All fields are required')
                 return res.redirect('/login')
             }
            passport.authenticate('local',(err,user,info)=>{
                console.log(user);
                if(err){
                    req.flash('error',info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error','some issue is there')
                    console.log("hello");
                    console.log(user);
                    return res.redirect('/login')
                  
                }
                req.logIn(user,(err)=>{
                     if(err){
                        req.flash('error','some error')

                        return next(err);
                     }
                     req.flash('success','logged in successfully')
                     return res.redirect('/')
                })
            })(req,res,next);
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
        try{
            const existingUser = await User.findOne({ email: email });
            if (existingUser) {
                req.flash('error', 'Email already taken');
                req.flash('name', name);
                req.flash('email', email);
                return res.redirect('/register');
            }
            /*
            User.exists({email: email},(err,result)=>{
                  if(err){
                     req.flash('error','something went wrong')
                     return res.redirect('/register');
                  }
                  if(result){
                    req.flash('error','email already taken')
                    req.flash('name', name)
                    req.flash('email',email)
                    return res.redirect('/register') 
                  }
            })
            */

            //hash password
            // flash messages are obtained in messages folder 
            //we need a package 
            const hashedPassword=await bcrypt.hash(password,10)
            const user=new User({
                name,
                email,
                password:hashedPassword
            })
            user.save();
            return res.redirect('/');
        }
        catch (error) {
            console.error('Error during user registration:', error);
            req.flash('error', 'Something went wrong');
            return res.redirect('/register');
        }
    
    }
    
    }
}
module.exports=authController;