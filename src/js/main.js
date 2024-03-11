import * as feather from 'feather-icons'

const STACKEXAPIURL = 'https://api.stackexchange.com/2.3/users/8512262'
const STACKEXAPIKEY = ')q0PGY5frwc43NqR*gt6hQ((';  // public key
var reputationTag = document.getElementById('reputationTag');
var placeholderTag = document.getElementById('placeholderTag');

showTagLoader(reputationTag);
showTagLoader(placeholderTag);
feather.replace();

// DARK MODE
// const body = document.querySelector('body');
// const toggle = document.getElementById('darkModeToggle');

// toggle.addEventListener("click", () => {
//     const bodyCheck = body.classList.contains('dark');
//     if (bodyCheck) {
//         body.className = ''
//     } else {
//         body.className = "dark"
//   }
// })


window.addEventListener('load', function() {
    getSoReputation();
    getSoTags(2);  // get top 2 stackoverflow tags
});


function showTagLoader(tagElement) {
    let loader = document.createElement('span');
    tagElement.innerHTML = 'working...&nbsp;';
    loader.classList.add('has-loader');
    tagElement.appendChild(loader);
}


function handleTagResponse(response) {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
}


function handleTagError(tagElement, error) {
    console.log(error);
    tagElement.innerText = 'error';
    tagElement.classList.add('is-danger');
}


function getSoReputation() {
    fetch(STACKEXAPIURL + "?site=stackoverflow&key=" + STACKEXAPIKEY)
        .then(response => {
            return handleTagResponse(response);
        })
        .then(data => {
            if (data.items.length > 0) {
                let repValue = data.items[0].reputation;
                reputationTag.innerText = repValue.toLocaleString();
                reputationTag.classList.add('is-dark');
            }
        })
        .catch(error => {
            handleTagError(reputationTag, error);
        });
}


function getSoTags(nTags) {
    const soUserUrl = 'https://stackoverflow.com/search?q=user:8512262'
    fetch(STACKEXAPIURL + "/tags?site=stackoverflow&key=" + STACKEXAPIKEY)
        .then(response => {
            return handleTagResponse(response);
        })
        .then(data => {
            if (data.items.length > 0) {
                // hide placeholder
                placeholderTag.style.display = 'none';
                // load tags
                let topTagNames = data.items.slice(0, nTags).map(tag => tag.name);
                let tagContainer = document.getElementById('topTags');
                topTagNames.forEach(tag => {
                    let tagLink = document.createElement('a');
                    tagLink.href = `${soUserUrl}+[${tag}]`;
                    tagLink.target = '_blank';
                    tagLink.innerText = tag;
                    tagLink.classList.add('tag', 'is-info');
                    tagContainer.appendChild(tagLink);
                });
            }
        })
        .catch(error => {
            handleTagError(placeholderTag, error);
        });
}
