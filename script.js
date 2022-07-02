//Global Variables
const count=30;
const apiKey='Your_API_KEY';
const apiURL=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;
let photosArray=[];
let isReadyToLoadNewImg=false;
let imagesLoaded=0;
let totalImages=0;
// Selectors

const imageContainer=document.querySelector(".image-container");
const loader=document.querySelector(".loader");
const backToTop= document.querySelector("#back-to-top");
// Event listeners

window.addEventListener("scroll",()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && isReadyToLoadNewImg){
        getPhotosFromAPI();
        isReadyToLoadNewImg=false;
    }
    if(loader.hidden)
        backToTop.hidden= false;
})

// Function

// Check if all the images are loaded or not

function hasImageLoaded(){
    imagesLoaded++;
    if(imagesLoaded===totalImages){
        loader.hidden=true;
        isReadyToLoadNewImg=true;
    }
}

// Create elements for links and photos, add to DOM

function displayPhotos(){
    // for each object of photos array do the work
    totalImages=photosArray.length;
    imagesLoaded=0;
    photosArray.forEach(photo=>{
        // Create an anchor element
        const anchorImg=document.createElement("a");
        anchorImg.href=photo.links.html;
        anchorImg.target="_blank";
        //Create an img element
        const image=document.createElement("img");
        image.src=photo.urls.full;
        if(photo.alt_description){
            image.alt=photo.alt_description;
            image.title=photo.alt_description;
        }
        image.addEventListener("load",hasImageLoaded);
        //Put image inside the anchor element 
        anchorImg.append(image);
        imageContainer.append(anchorImg);
    });
}
async function getPhotosFromAPI(){
    try{
        const response=await fetch(apiURL);
        photosArray=await response.json();
        displayPhotos();
    }
    catch(error){
        //Catch error
    }
}


getPhotosFromAPI();
