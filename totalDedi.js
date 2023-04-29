const apiUrl = "https://api.github.com/repos/tomsdedicaces/drawings/contents/";
const accessToken = 'Yag2F0YcxWAfh8Nvtq6BqxBSwNsJAk9pK7rx_phg';

function reString(str) {
    var nString = "";
    for (var i = str.length - 1; i >= 0; i--) {
        nString += str[i];
    }
    return nString;
}

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

const owner = "tomsdedicaces";
const repo = "drawings";
var totalCount = 0;

function countImageFiles() {
    fetch(apiUrl, {
    headers: {
        Authorization: `token ${reString(accessToken)}`,
    },
})
    .then(response => response.json())
    .then(data => {
        const folders = data.filter(item => item.type === "dir").map(item => item.name);
        for (const folder of folders) {
            fetch(apiUrl+folder, {
                headers: {
                    Authorization: `token ${reString(accessToken)}`,
                },
            })
            .then(response => response.json())
            .then(data => {
                const imageFiles = data.filter(item => item.type === "file" && item.name.match(/\.(jpg|jpeg|png|gif)$/i));
                totalCount += imageFiles.length;
                console.log(totalCount)
                if (folder === folders[folders.length - 1]) {
                    document.getElementById("mainTitle").innerHTML = "Toms Dédicaces ("+totalCount+")"
                }
            })
            .catch(error => console.error(error));
        }
    })
    .catch(error => console.error(error));
}

countImageFiles()