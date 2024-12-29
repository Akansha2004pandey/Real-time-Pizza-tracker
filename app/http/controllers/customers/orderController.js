const Order=require('../../../models/order')

function orderController(){
    return {
        store(req,res){
             //validate request
             const {phone,address}=req.body;
             if(!phone || !address){
                req.flash('error','All fields are required');
                res.redirect('/cart')
             }
             const order=new Order({
                customerId:req.user._id,
                items:req.session.cart.items,
                phone,
                address
             })
             order.save().then(res=>{
                  req.flash('success','Order Placed Successfully');
                  return res.redirect('/')
             }).catch(err=>{
                console.log('error');
                req.flash('error','somethingw went wrong')
                return res.redirect('/cart');
             })
             console.log(req.body);
        }
    }
}
module.exports=orderController;