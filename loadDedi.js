document.getElementById("title").innerHTML = authorName
let isDown = false;
let startX;
let scrollLeft;

// Load images
// Get a reference to the container element
const container = document.querySelector('#gallery');

// Define the folder path
const folderPath = 'drawings/'+folderName;

var imageLoadIndex = 1

container.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - container.offsetLeft;
    scrollLeft = container.scrollLeft;

});

container.addEventListener('mouseleave', () => {
    isDown = false;
});

container.addEventListener('mouseup', () => {
    isDown = false;
});

container.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - container.offsetLeft;
    const walk = (x - startX) * 2;
    container.scrollLeft = scrollLeft - walk;
});

// LOAD THE DEDI
const apiUrl = "https://api.github.com/repos/tomsdedicaces/drawings/contents/";
const accessToken = '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';

// Fetch the contents of the folder
var counter = 0
fetch(apiUrl + folderName, {
    headers: {
        Authorization: `token ${accessToken}`,
    },
})
.then(response => response.json())
.then(data => {
    // Filter the results to only include image files
    const imageFiles = data.filter(item => item.type === "file" && item.name.match(/\.(jpg|jpeg|png|gif)$/i));
    // Loop through the image files and create an HTML img element for each one
    imageFiles.forEach(imageLink => {
        const img = document.createElement('img');
        img.src = imageLink.download_url;
        img.classList.add("galleryImg")
        const imgdiv = document.createElement('div')
        imgdiv.classList.add('imgdiv')
        const fullbutton = document.createElement('img')
        fullbutton.src = 'assets/full.png'
        fullbutton.classList.add("fullScreenButton")
        imgdiv.appendChild(fullbutton)
        imgdiv.appendChild(img)
        container.appendChild(imgdiv);
        counter++
    });
    document.getElementById("name").innerHTML = authorName+" ("+counter+")"
});

// add click event listener to gallery container
container.addEventListener('click', (e) => {
    // check if clicked element is a full-screen button
    if (e.target.classList.contains('fullScreenButton')) {
        // prevent default link behavior
        e.preventDefault();
        
        // get parent gallery item
        const galleryItem = e.target.closest('.imgdiv');
        
        // get image source
        const imageUrl = galleryItem.querySelector('.galleryImg').src;
        
        // open image in new tab
        window.open(imageUrl, '_blank');
    }
});