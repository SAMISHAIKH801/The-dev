

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCMaZ-vYh-GcOT34UvLtrOyS3en0fzODlc",
    authDomain: "officetaskimgupload.firebaseapp.com",
    projectId: "officetaskimgupload",
    storageBucket: "officetaskimgupload.appspot.com",
    messagingSenderId: "877639800905",
    appId: "1:877639800905:web:dbc855304a7c4d0b3f0798"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // DOM elements
  let fileText = document.querySelector(".fileText");
  let uploadPercent = document.querySelector(".progressPercentage");
  let progress = document.querySelector(".progress");
  let img = document.querySelector(".img");
  
  let fileItem;
  let fileName;

//   let imageUrls = []; // Array to store uploaded image URLs

  
  function getFile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
  }
  
//   function uploadImage() {
//     let storageRef = firebase.storage().ref('images/' + fileName); // Corrected the folder name to 'images'
//     let uploadTask = storageRef.put(fileItem);
  
//     uploadTask.on("state_changed", (snapshot) => {
//         console.log('snapshot', snapshot);
  
//         let percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
//         console.log(percentVal);
  
//         uploadPercent.innerHTML = percentVal + '%';
//         progress.style.width = percentVal + "%";
//     }, (error) => {
//         console.log("error is", error);
//     }, () => {


//         uploadTask.snapshot.ref.getDownloadURL().then((url) => {
//             console.log("url is", url);
          


//             if (img) {
//                 img.setAttribute("src", url);
//                 // img.style.display = "block";
//             } else {
//                 console.log("img element not found");
//             }
            
//         }).catch((error) => {
//             console.error("Error retrieving download URL:", error);
        
  
            
            
//         });
//     });
//   }

// Upload an image to Firebase Storage
function uploadImage() {
    let storageRef = firebase.storage().ref('images/' + fileName);
    let uploadTask = storageRef.put(fileItem);

    uploadTask.on("state_changed", (snapshot) => {
        let percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        uploadPercent.innerHTML = percentVal + '%';
        progress.style.width = percentVal + "%";
    }, (error) => {
        console.log("Error uploading image:", error);
    }, () => {
        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log("Image uploaded:", url);
            img.setAttribute("src", url);
        }).catch((error) => {
            console.error("Error retrieving download URL:", error);
        });
    });
}




// Function to handle image upload callback from img.js
// window.handleImageUpload = function(url) {
//     let imgElement = document.createElement('img');
//     imgElement.src = url;
//     imgElement.className = "d-block w-100"; // Adjust class as needed
//     imgElement.alt = "Uploaded Image";
    
//     let postsDiv = document.getElementById('posts');
//     if (postsDiv) {
//         let imgContainer = document.createElement('div');
//         imgContainer.className = "card-post";
//         imgContainer.appendChild(imgElement);
//         postsDiv.appendChild(imgContainer);
//     } else {
//         console.error("Posts container not found");
//     }
// };

window.createPost = function () {

    let postTitle = document.querySelector("#postTitle").value;
    let postText = document.querySelector("#postText").value;
    let postPrice = document.querySelector("#postPrice").value;

    
    axios
    .post(`/api/v1/post`, {
         title: postTitle,
         text: postText,
         price: postPrice,
         image: img.getAttribute('src') // Use the current uploaded image URL

    })
    .then(function (response) {
            console.log(response.data);
            document.querySelector("#result").innerHTML =
                response.data;

                getAllPost()
                // resetForm()
        })
        .catch(function (error) {
            console.log(error.response.data);
            document.querySelector("#result").innerHTML =
                "post not created";
        });
};



 window.getAllPost = function () {

   
    axios
    .get(`/api/v1/posts`, )
        .then(function (response) {
            console.log(response.data);

            // let postHtml = ``
            let postHtml = '';
            response.data.forEach((eachPost) => {
                let imageUrl = eachPost.image ? `<img src="${eachPost.image}" class="d-block w-100" alt="...">` : '';

                postHtml += `<div id="card-${eachPost._id}"  class="card-post product-box">
                                ${imageUrl}

                                <h2>${eachPost.title}</h2>
                                <p>${eachPost.text}</p>
                                <h4>${eachPost.price}</h4>
                                <button onclick="deletePost('${eachPost._id}')">DELETE</button>
                                <button onclick="editPost('${eachPost._id}', '${eachPost.title}', '${eachPost.text}')">EDIT</button>
                            </div>`;
            });

            // response.data.map((eachPost) =>{
            //     postHtml += `<div id="card-${eachPost._id}" class="card-post">
            //       <img  class="d-block w-100" class="img"  alt="...">
            //     <h2>${eachPost.title}</h2>
            //     <p>${eachPost.text}</p>
            //     <h4>${eachPost.price}</h4>

            //     <button onclick="deletePost('${eachPost._id} ')" >DELETE</button>
            //     <button onclick="editPost('${eachPost._id}', '${eachPost.title}', '${eachPost.text}')">EDIT</button>
            //     </div>`

                
            // })
            document.querySelector("#posts").innerHTML = postHtml
        })
        .catch(function (error) {
            console.log(error);
            
            
            // if(error.response.status === 401){
            //     window.location.href = '/login.html'
            // }
            document.querySelector("#posts").innerHTML = `error`
               
        });
};


window.deletePost = function (postId) {

    console.log('delete', postId);
   
    axios
    .delete(`/api/v1/post/${postId}`, )
        .then(function (response) {
            console.log(response.data);

            getAllPost()

           
        })
        .catch(function (error) {
            console.log(error.response.data);
            
            document.querySelector("#posts").innerHTML = `error`
               
        });
};

window.editPost =  (postId, title, text) => {

    console.log('edit', postId);

    document.querySelector(`#card-${postId}`).innerHTML = 
    `<form  onsubmit="savePost('${postId}') " >
       Title:  <input type="text" value='${title}' id="title-${postId}" /> 
        <br />
        Text:   <input type="text" value='${text}' id="text-${postId}" />
        <br />
       <button>Save</button>
    </form>`

   
    
};

window.savePost = (postId) =>{
     const updatedTitle = document.querySelector(`#title-${postId}`).value
     const updatedText = document.querySelector(`#text-${postId}`).value

     axios
    .put(`/api/v1/post/${postId}`, {
        title: updatedTitle,
        text: updatedText
    } )
        .then(function (response) {
            console.log(response.data);

            
           getAllPost()
            

           
        })
        .catch(function (error) {
            console.log(error.response.data);
            
            document.querySelector("#result").innerHTML = `error`
               
        });
}