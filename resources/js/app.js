
 import axios from 'axios'
 import Noty from 'noty'
 //import {initAdmin} from './admin'
 import moment from 'moment'
let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')
function updatecart(pizza) {
    axios.post('/update-cart',pizza).then(res =>{
       //console.log("hello form appjs")
      //  console.log(res)
     cartCounter.innerText = res.data.totalQty 
     new Noty({
         type:'success',
         timeout:1000,
         progressBar:false,
         text:'Item added to the cart '
     }).show()
    })
}


addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        
        let pizza=JSON.parse(btn.dataset.pizza)
     console.log(pizza) 
      updatecart(pizza)
      
       //console.log(e)
    })
  

})
// Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(() => {
        alertMsg.remove()
    }, 5000)
}

//initAdmin()