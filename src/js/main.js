import * as feather from 'feather-icons'

const STACKEXAPIURL = 'https://api.stackexchange.com/2.3/users/8512262'
const STACKEXAPIKEY = ')q0PGY5frwc43NqR*gt6hQ((';  // public key


window.addEventListener('load', function() {
    feather.replace();
    getSoReputation();
    getSoTags(2);  // get top 2 stackoverflow tags
});


function getSoReputation() {
    let reputationText = document.getElementById('reputation');
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
                reputationText.innerText = repValue.toLocaleString();
                reputationText.classList.add('is-dark');
            }
        })
        .catch(error => {
            console.log(error);
            reputationText.innerText = 'error';
            reputationText.classList.add('is-danger');
        });
}


function getSoTags(nTags) {
    const soUserUrl = 'https://stackoverflow.com/search?q=user:8512262'
    let placeholder = document.getElementById('tagPlaceholder');
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
                placeholder.style.display = 'none';
                // load tags
                let topTags = data.items.slice(0, nTags).map(tag => tag.name);
                let tagContainer = document.getElementById('topTags');
                topTags.forEach(tag => {
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
            placeholder.innerText = 'error';
            placeholder.classList.add('is-danger');
        });
}
