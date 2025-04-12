document.getElementById("title").innerHTML = authorName

// Load images
// Get a reference to the container element
const container = document.querySelector('#gallery');

// Define the folder path
const folderPath = 'drawings/'+folderName;

var imageLoadIndex = 1

function reString(str) {
    var nString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        nString += str[i];
    }
    return nString;
}

// LOAD THE DEDI
const apiUrl = "https://api.github.com/repos/tomsdedicaces/drawings/contents/";
const accessToken = 'Yag2F0YcxWAfh8Nvtq6BqxBSwNsJAk9pK7rx_phg';

// View rate limit
fetch(`https://api.github.com/rate_limit`, {
    headers: {
        Authorization: `token ${reString(accessToken)}`,
    },
})
    .then(response => response.json())
    .then(data => {
        console.log(`You have ${data.rate.remaining} requests left`);
        console.log(`Your rate limit will reset at ${new Date(data.rate.reset * 1000)}`);
    })
    .catch(error => {
        console.error(error);
    });

// Fetch the contents of the folder
var counter = 0
fetch(apiUrl + folderName, {
    headers: {
        Authorization: `token ${reString(accessToken)}`,
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

// Viewing dedis fullscreen
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

// Scrolling horizontally
container.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault(); // prevent vertical scroll
      container.scrollLeft += e.deltaY; // scroll horizontally instead
    }
  });