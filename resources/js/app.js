import axios from 'axios';
import Noty from 'noty';
let addToCart=document.querySelectorAll('.add-to-cart');
let cartCounter=document.querySelector('#cartCounter');
function updateCart(pizza){
    //ajax call
    // we are using axios library
    axios.post('/update-cart',pizza).then(res=>{
        cartCounter.innerText=res.data.totalQty;
        new Noty({
          type:'success',
          timeout:1000,
          text: "item added to cart"
        }).show();
    })
}
addToCart.forEach((btn)=>{
      btn.addEventListener('click',(e)=>{
        let pizza=JSON.parse(btn.dataset.pizza);
        updateCart(pizza);
        console.log(pizza);
      })
})