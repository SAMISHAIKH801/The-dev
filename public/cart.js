
//  cart 
let cartIcon = document.querySelector('#cart-icon')
let cart = document.querySelector('.cart')
let closeCart = document.querySelector('#close-cart')

//  open cart
cartIcon.onclick = () => {
    cart.classList.add('active')
}

//  close cart
closeCart.onclick = () => {
    cart.classList.remove('active')
}

//  card working js

if(document.readyState == "loading"){
    document.addEventListener("DOMContentLoaded", ready)
}else{
    ready()
}

//  making function

// function ready(){
//     //  Remove item from cart
//     let removeCartButtons = document.getElementsByClassName('cart-remove')
//     console.log(removeCartButtons)

//     for(let i = 0; i < removeCartButtons.length; i++){
//         let button = removeCartButtons[i]
//         button.addEventListener('click', removeCartItem)
//     }

//     let quantityInputs = document.getElementsByClassName('cart-quantity')

//     for(let i = 0; i < quantityInputs.length; i++){
//         let input = quantityInputs[i]
//         input.addEventListener("change", quantityChanged)
//     }

//     //  add to cart
//     let addCart =  document.getElementsByClassName('add-cart')
//     for(let i = 0; i < quantityInputs.length; i++){
//         let button = addCart[i]
//         button.addEventListener('click', addCartClicked)
//     }
// }


function ready() {
    // Remove item from cart
    let removeCartButtons = document.getElementsByClassName('cart-remove');
    for (let i = 0; i < removeCartButtons.length; i++) {
        let button = removeCartButtons[i];
        button.addEventListener('click', removeCartItem);
    }

    let quantityInputs = document.getElementsByClassName('cart-quantity');
    for (let i = 0; i < quantityInputs.length; i++) {
        let input = quantityInputs[i];
        input.addEventListener('change', quantityChanged);
    }

    // Add to cart
    let addCartButtons = document.getElementsByClassName('add-cart');
    for (let i = 0; i < addCartButtons.length; i++) {
        let button = addCartButtons[i];
        button.addEventListener('click', addCartClicked);
    }

    //  buy btn work
    document.getElementsByClassName('btn-buy')[0].addEventListener('click', buyButtonClicked)
}

//  function buy btn
function buyButtonClicked(){
    alert('your order is place')

    let cartContent = document.getElementsByClassName('cart-content')[0]
    while(cartContent.hasChildNodes()){
        cartContent.removeChild(cartContent.firstChild)
    }
    updateTotal()
}


//  remove cart items
function removeCartItem(event){
    let buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    updateTotal()
}

//  quantity changed
function quantityChanged(event){
    let input = event.target;

    if(isNaN(input.value) || input.value <= 0){
        input.value = 1
    }

    updateTotal()
}

//  add to acrt 

// function addCartClicked(event){
//     let button = event.target
//     let shopProducts = button.parentElement
//     let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
//     let price = shopProducts.getElementsByClassName('price')[0].innerText;
//     let productImg = shopProducts.getElementsByClassName('product-img')[0].innerText;
//     console.log(title, price, productImg)

//      addProductToCart(title, price, productImg)
//      updateTotal()

// }

// //  title price img
// function addProductToCart(title, price, productImg){
//     let cartShopBox = document.createElement('div')

//      cartShopBox.classList.add('cart-box')
//     let cartItems = document.getElementsByClassName('cart-content')[0]
//     let cartItemNames = cartItems.getElementsByClassName("cart-product-title")

//     for(i = 0; i < cartItemNames.length; i++){
//         if(cartItemNames[i].innerText == title){
//          alert("you have already add this item to cart")
//             return;
//         }
//     }
// }

// let cartBoxContent = `
//               <img src="${productImg}" alt="" class="cart-img">

//                     <div class="detail-box">
//                       <div class="cart-product-title">${title}</div>
//                       <div class="cart-price">${price}</div>
//                       <input type="number" value="1" class="cart-quantity">
//                     </div>
//                     <!-- remove cart  -->

//                     <i class="bi bi-trash-fill cart-remove"></i>
//                       `

// cartShopBox.innerHtml = cartBoxContent;
// cartItems.append(cartShopBox)
// cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem)

// cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged)



function addCartClicked(event) {
    let button = event.target;
    let shopProducts = button.parentElement;
    let title = shopProducts.getElementsByClassName('product-title')[0].innerText;
    let price = shopProducts.getElementsByClassName('price')[0].innerText;
    let productImg = shopProducts.getElementsByClassName('product-img')[0].src;
    console.log(title, price, productImg);

    addProductToCart(title, price, productImg);
    updateTotal();
}

function addProductToCart(title, price, productImg) {
    let cartShopBox = document.createElement('div');
    cartShopBox.classList.add('cart-box');
    let cartItems = document.getElementsByClassName('cart-content')[0];
    let cartItemNames = cartItems.getElementsByClassName('cart-product-title');

    for (let i = 0; i < cartItemNames.length; i++) {
        if (cartItemNames[i].innerText === title) {
            alert('You have already added this item to the cart');
            return;
        }
    }

    let cartBoxContent = `
        <img src="${productImg}" alt="" class="cart-img">
        <div class="detail-box">
            <div class="cart-product-title">${title}</div>
            <div class="cart-price">${price}</div>
            <input type="number" value="1" class="cart-quantity">
        </div>
        <i class="bi bi-trash-fill cart-remove"></i>
    `;

    cartShopBox.innerHTML = cartBoxContent;
    cartItems.append(cartShopBox);

    cartShopBox.getElementsByClassName('cart-remove')[0].addEventListener('click', removeCartItem);
    cartShopBox.getElementsByClassName('cart-quantity')[0].addEventListener('change', quantityChanged);
}



//  update Total

function updateTotal(){
    let cartContent = document.getElementsByClassName('cart-content')[0]
    let cartBoxes = cartContent.getElementsByClassName('cart-box')
    let total = 0;

    for(let i = 0; i< cartBoxes.length; i++){
        let cartBox = cartBoxes[i]
        let priceElement = cartBox.getElementsByClassName('cart-price')[0]
        let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
        let price = parseFloat(priceElement.innerText.replace("$", ""))
        let quantity = quantityElement.value
        total = total + ( price * quantity)

    }
        //  if price contain some cents value
        total = Math.round(total * 100 / 100)

        document.getElementsByClassName('total-price')[0].innerText = "$" + total;

    
}