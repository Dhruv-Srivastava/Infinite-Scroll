//Global Variables
const count=30;
const apiKey='Your APIKEY';
let apiURL;
let photosArray=[];
let isReadyToLoadNewImg=false;
let imagesLoaded=0;
let totalImages=0;
let searchQuery;
// Selectors

const imageContainer=document.querySelector(".image-container");
const loader=document.querySelector(".loader");
const searchBar=document.querySelector("input");
const noResDiv=document.querySelector(".no-response");

// Event listeners

searchBar.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        if(noResDiv.firstElementChild){
            noResDiv.firstElementChild.remove();
        }
        const query=searchBar.value;
        searchQuery=query;
        apiURL=`https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query=${query}`;
        searchBar.value="";
        loader.hidden=false;
        getPhotosFromAPI();
        while(imageContainer.firstElementChild){
            imageContainer.firstElementChild.remove();
        }
    }
})

window.addEventListener("scroll",()=>{
    if(window.innerHeight+window.scrollY >= document.body.offsetHeight-1000 && isReadyToLoadNewImg){
        getPhotosFromAPI();
        isReadyToLoadNewImg=false;
    }
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
        if(!response.ok){
            const noResText=document.createElement("h2");
            noResText.textContent=`No result found for the search '${searchQuery}'.`
            noResText.style.textAlign="center";
            noResDiv.append(noResText);
            loader.hidden=true;
        }
        else{
            photosArray=await response.json();
            // console.log(photosArray);
            displayPhotos();
        }
    }
    catch(error){
        //Catch error

    }
}

