function includeHTML() {
    var z, i, elmnt, file, xhttp;
    /* Loop through a collection of all HTML elements: */
    z = document.getElementsByTagName("*");
    for (i = 0; i < z.length; i++) {
        elmnt = z[i];
        /*search for elements with a certain atrribute:*/
        file = elmnt.getAttribute("w3-include-html");
        if (file) {
            /* Make an HTTP request using the attribute value as the file name: */
            xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function() {
                if (this.readyState == 4) {
                    if (this.status == 200) {elmnt.innerHTML = this.responseText;}
                    if (this.status == 404) {elmnt.innerHTML = "Page not found.";}
                    /* Remove the attribute, and call this function once more: */
                    elmnt.removeAttribute("w3-include-html");
                    includeHTML();
                }
            }
        xhttp.open("GET", file, true);
        xhttp.send();
        /* Exit the function: */
        return;
        }
    }
}
includeHTML();

function checkOverflow(obj) {
    var rect = obj.getBoundingClientRect();
    var xCo = Math.abs((rect.right + rect.left)/2)
    var width = document.body.clientWidth/2
    if (xCo < width) {
        obj.classList.add("left")
        obj.classList.remove("right")
    } else {
        obj.classList.add("right")
        obj.classList.remove("left")
    }
}

function checkOverflowAll() {
var els = document.getElementsByClassName("letter")
for (let i = 0; i < els.length; i++) {
    checkOverflow(els[i])
}
}

window.addEventListener('resize', function(event) {
    checkOverflowAll()
}, true);


setTimeout(()=> {
    checkOverflowAll();
}
,200);