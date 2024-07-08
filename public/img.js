


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

  let imageUrls = []; // Array to store uploaded image URLs

  
  function getFile(e) {
    fileItem = e.target.files[0];
    fileName = fileItem.name;
    fileText.innerHTML = fileName;
  }
  
  function uploadImage() {
    let storageRef = firebase.storage().ref('images/' + fileName); // Corrected the folder name to 'images'
    let uploadTask = storageRef.put(fileItem);
  
    uploadTask.on("state_changed", (snapshot) => {
        console.log('snapshot', snapshot);
  
        let percentVal = Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        console.log(percentVal);
  
        uploadPercent.innerHTML = percentVal + '%';
        progress.style.width = percentVal + "%";
    }, (error) => {
        console.log("error is", error);
    }, () => {

             // Upload completed successfully
            //  uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            //     console.log("Image uploaded:", url);
            //     imageUrls.push(url); // Store the image URL in the array
            //     displayUploadedImages(); // Display uploaded images in UI


        uploadTask.snapshot.ref.getDownloadURL().then((url) => {
            console.log("url is", url);
          


            if (img) {
                img.setAttribute("src", url);
                img.style.display = "block";
            } else {
                console.log("img element not found");
            }
            
        }).catch((error) => {
            console.error("Error retrieving download URL:", error);
        
  
            
            
        });
    });
  }



// export const myImg = url