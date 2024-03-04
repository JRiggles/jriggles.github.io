import * as feather from 'feather-icons'


window.addEventListener('load', function() {
    feather.replace();
    // getSoReputation();
    // getSoTags(2);
})


function getSoReputation() {
    const apiUrl = 'https://api.stackexchange.com/2.3/users/8512262?site=stackoverflow';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            let reputationText = document.getElementById('reputation');
            if (data.items.length > 0) {
                let repValue = data.items[0].reputation;
                reputationText.innerText = repValue.toLocaleString();
                repValue.classList.add('is-dark');
            } else {
                reputationText.innerText = '----';
            }
        })
        .catch(_error => {
            let reputationText = document.getElementById('reputation');
            reputationText.innerText = 'error fetching reputation';
            reputationText.classList.add('is-danger');
        });
}


function getSoTags(nTags) {
    const apiUrl = 'https://api.stackexchange.com/2.3/users/8512262/tags?site=stackoverflow';
    const soUserUrl = 'https://stackoverflow.com/search?q=user:8512262'

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            if (data.items.length > 0) {
                // hide placeholder
                let placeholder = document.getElementById('tagPlaceholder');
                placeholder.style.display = 'none';
                // load tags
                let topTags = data.items.slice(0, nTags).map(tag => tag.name);
                console.log(topTags);
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
            let placeholder = document.getElementById('tagPlaceholder')
            placeholder.innerText = 'error fetching tags';
            placeholder.classList.add('is-danger');

        });
}
