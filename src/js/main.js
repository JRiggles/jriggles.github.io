import * as feather from 'feather-icons'

const STACKEXAPIURL = 'https://api.stackexchange.com/2.3/users/8512262'
const STACKEXAPIKEY = ')q0PGY5frwc43NqR*gt6hQ((';  // public key

var reputationTag = document.getElementById('reputationTag');
var placeholderTag = document.getElementById('placeholderTag');

window.addEventListener('load', function() {
    feather.replace();
    showLoader(reputationTag);
    showLoader(placeholderTag);
    getSoReputation();
    getSoTags(2);  // get top 2 stackoverflow tags
});


function showLoader(parentElement) {
    parentElement.innerHTML = 'working...&nbsp;';
    let loader = document.createElement('span');
    loader.classList.add('has-loader');
    parentElement.appendChild(loader);
}


function getSoReputation() {
    fetch(STACKEXAPIURL + "?site=stackoverflow&key=" + STACKEXAPIKEY)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.items.length > 0) {
                let repValue = data.items[0].reputation;
                reputationTag.innerText = repValue.toLocaleString();
                reputationTag.classList.add('is-dark');
            }
        })
        .catch(error => {
            console.log(error);
            reputationTag.innerText = 'error';
            reputationTag.classList.add('is-danger');
        });
}


function getSoTags(nTags) {
    const soUserUrl = 'https://stackoverflow.com/search?q=user:8512262'
    fetch(STACKEXAPIURL + "/tags?site=stackoverflow&key=" + STACKEXAPIKEY)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
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
                    tagLink.classList.add('tag', 'is-link');
                    tagContainer.appendChild(tagLink);
                });
            }
        })
        .catch(error => {
            console.log(error);
            placeholderTag.innerText = 'error';
            placeholderTag.classList.add('is-danger');
        });
}
