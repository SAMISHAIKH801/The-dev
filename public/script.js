// window.getAllPost = function () {
//   axios
//     .get(`/api/v1/posts`)
//     .then(function (response) {
//       console.log(response.data);

//       let postHtml = ``;

//       // d-block w-100   ---------  img class

//       response.data.map((eachPost) => {
//         let imageUrl = eachPost.image ? `<img src="${eachPost.image}" class="product-img" alt="...">` : '';
//         postHtml += `<div id="card-${eachPost._id}" class="card-post product-box">
//                     ${imageUrl}

//                 <h2 class="product-title">${eachPost.title}</h2>
//                 <p class="product-text">${eachPost.text}</p>
//                 <span class="price">${eachPost.price}</span>
//                 <i class="bi bi-cart-fill add-cart"></i>

                 



//                 </div>`;
//       });
//       document.querySelector("#posts").innerHTML = postHtml;
//     })
//     .catch(function (error) {
//       console.log(error);

//       // if(error.response.status === 401){
//       //     window.location.href = '/login.html'
//       // }
//       document.querySelector("#posts").innerHTML = `error`;
//     });
// };

//   //  stars -----------------
// {/* <div class="star-rating">
// <span class="star" data-value="1">&#9733;</span>
// <span class="star" data-value="2">&#9733;</span>
// <span class="star" data-value="3">&#9733;</span>
// <span class="star" data-value="4">&#9733;</span>
// <span class="star" data-value="5">&#9733;</span>
// </div> */}

// {
//   /* <button onclick="deletePost('${eachPost._id} ')" >DELETE</button>
//                 <button onclick="editPost('${eachPost._id}', '${eachPost.title}', '${eachPost.text}')">EDIT</button> */
// }




window.getAllPost = function () {
  axios
    .get(`/api/v1/posts`)
    .then(function (response) {
      console.log(response.data);

      let postHtml = ``;

      response.data.map((eachPost) => {
        let imageUrl = eachPost.image ? `<img src="${eachPost.image}" class="product-img" alt="...">` : '';
        postHtml += `<div id="card-${eachPost._id}" class="card-post product-box">
                    ${imageUrl}
                <h2 class="product-title">${eachPost.title}</h2>
                <p class="product-text">${eachPost.text}</p>
                <span class="price">${eachPost.price}</span>
                <i class="bi bi-cart-fill add-cart" onclick="addCartClicked(event)"></i>
                </div>`;
      });
      document.querySelector("#posts").innerHTML = postHtml;
    })
    .catch(function (error) {
      console.log(error);
      document.querySelector("#posts").innerHTML = `error`;
    });
};











  //  cart js --------------






  
// //  cart 
// let cartIcon = document.querySelector('#cart-icon')
// let cart = document.querySelector('.cart')
// let closeCart = document.querySelector('#close-cart')

// //  open cart
// cartIcon.onclick = () => {
//     cart.classList.add('active')
// }

// //  close cart
// closeCart.onclick = () => {
//     cart.classList.remove('active')
// }

// //  card working js

// if(document.readyState == "loading"){
//     document.addEventListener("DOMContentLoaded", ready)
// }else{
//     ready()
// }

// //  making function

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

// //  remove cart items
// function removeCartItem(event){
//     let buttonClicked = event.target;
//     buttonClicked.parentElement.remove()
//     updateTotal()
// }

// //  quantity changed
// function quantityChanged(event){
//     let input = event.target;

//     if(isNaN(input.value) || input.value <= 0){
//         input.value = 1
//     }

//     updateTotal()
// }

// //  add to acrt 

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



// //  update Total

// function updateTotal(){
//     let cartContent = document.getElementsByClassName('cart-content')[0]
//     let cartBoxes = cartContent.getElementsByClassName('cart-box')
//     let total = 0;

//     for(let i = 0; i< cartBoxes.length; i++){
//         let cartBox = cartBoxes[i]
//         let priceElement = cartBox.getElementsByClassName('cart-price')[0]
//         let quantityElement = cartBox.getElementsByClassName('cart-quantity')[0]
//         let price = parseFloat(priceElement.innerText.replace("$", ""))
//         let quantity = quantityElement.value
//         total = total + ( price * quantity)

//         //  if price contain some cents value
//         total = Math.round(total * 100 / 100)

//         document.getElementsByClassName('total-price')[0].innerText = "$" + total;

//     }
// }








// document.getElementById('reviewButton').addEventListener('click', function() {
//   document.getElementById('reviewFormContainer').classList.remove('hidden');
// });

// function submitReview(event) {
//   event.preventDefault();

//   const name = document.getElementById('name').value;
//   const message = document.getElementById('message').value;

//   document.getElementById('reviewForm').classList.add('hidden');
//   document.getElementById('doneMessage').classList.remove('hidden');

//   document.getElementById('reviewForm').reset();
// }




// window.createComment = function() {

//   let postName = document.querySelector("#postName").value;
//   let postComment = document.querySelector("#postComment").value;

//   axios.post('/api/v1/comment', {
//       name: postName,
//       message: postComment
//   })
//   .then(function(response) {
//       console.log(response.data);
//       document.querySelector("#result2").innerHTML = response.data;
//       getAllPost();
//   })
//   .catch(function(error) {
//       console.log(error.response.data);
//       document.querySelector("#result2").innerHTML = "Post not created";
//   });
// };
// window.getAllPost = function () {

 
//     axios
//     .get(`/api/v1/comments`, )
//         .then(function (response) {
//             console.log(response.data);
  
//             // let postHtml = ``
//             let postHtml = '';
//             response.data.forEach((eachPost) => {
//                 let imageUrl = eachPost.image ? `<img src="${eachPost.image}" class="d-block w-100" alt="...">` : '';
  
//                 postHtml += `<div id="card-${eachPost._id}" class="carousel-caption">
//                                 ${imageUrl}
  
//                                 <h2>${eachPost.name}</h2>
//                                 <p>${eachPost.message}</p>
                               
                               
//                             </div>`;
//             });
  
//             // response.data.map((eachPost) =>{
//             //     postHtml += `<div id="card-${eachPost._id}" class="card-post">
//             //       <img  class="d-block w-100" class="img"  alt="...">
//             //     <h2>${eachPost.title}</h2>
//             //     <p>${eachPost.text}</p>
//             //     <h4>${eachPost.price}</h4>
  
//             //     <button onclick="deletePost('${eachPost._id} ')" >DELETE</button>
//             //     <button onclick="editPost('${eachPost._id}', '${eachPost.title}', '${eachPost.text}')">EDIT</button>
//             //     </div>`
  
                
//             // })
//             document.querySelector("#comments").innerHTML = postHtml
//         })
//         .catch(function (error) {
//             console.log(error);
            
            
//             // if(error.response.status === 401){
//             //     window.location.href = '/login.html'
//             // }
//             document.querySelector("#result2").innerHTML = `error`
               
//         });
//   };


// window.createComment = function() {
//   let postName = document.querySelector("#postName").value;
//   let postComment = document.querySelector("#postComment").value;

//   axios.post('/api/v1/comment', {
//       name: postName,
//       message: postComment
//   })
//   .then(function(response) {
//       console.log(response.data);
//       document.querySelector("#result2").innerHTML = response.data;
     
//       getAllPost();
//   })
//   .catch(function(error) {
//       console.log(error.response.data);
//       document.querySelector("#result2").innerHTML = "Post not created";
//   });

  
// };

// window.getAllPost = function() {
//   axios.get('/api/v1/comments')
//   .then(function(response) {
//       console.log(response.data);

//       let postHtml = '';
//       response.data.forEach((eachComment) => {
//           let imageUrl = eachComment.image ? `<img src="${eachComment.image}" class="d-block w-100" alt="...">` : '';

//           postHtml += `<div id="card-${eachComment._id}" class="carousel-caption card-post">
//                           ${imageUrl}
//                           <h2>${eachComment.name}</h2>
//                           <p>${eachComment.message}</p>
//                       </div>`;
//       });

//       document.querySelector("#comments").innerHTML = postHtml;
//   })
//   .catch(function(error) {
//       console.log(error);
//       document.querySelector("#result2").innerHTML = `error`;
//   });
// };
