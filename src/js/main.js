// import { createIcons, icons } from 'lucide';

function koco(callback) {
	const keyPhrase = [
		"ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown", "ArrowLeft", "ArrowRight", "ArrowLeft", "ArrowRight", "b", "a", "Enter"
	];
	let index = 0;

	document.addEventListener("keyup", (event) => { // get the key that was pressed
		event.key === keyPhrase[index] ? index++ : index = 0;
		if (index === keyPhrase.length) { // if the entire keyPhrase is entered correctly...
			index = 0; // clear the index so we can use this function again
			callback(); // call the passed-in function
		}
	});
}

function launch() {
  console.log("party time!");
  confetti({
    particleCount: 256,
    spread: 128,
    origin: { y: 0.5 },
    shapes: ["circle", "square", "triangle"],
    colors: ["#EE3243", "#F4A312", "#18B990", "#5384DC", "#AA55BB",]
  });
}

var STACKEXAPIURL = "https://api.stackexchange.com/2.3/users/8512262";
var STACKEXAPIKEY = ")q0PGY5frwc43NqR*gt6hQ(("; // public key
// StackOverflow data
var repTag = document.getElementById("reputationTag");
var phTag = document.getElementById("placeholderTag");
showTagLoader(repTag);
// showTagLoader(phTag);

// run on page load
document.addEventListener("DOMContentLoaded", () => {
  feather.replace();
  // createIcons({icons,});  // load lucide icons
  getSoReputation();
  // getSoTags(2); // get top 2 stackoverflow tags
  koco(launch);  // set up super secret suprise
});

function showTagLoader(tagElement) {
  let loader = document.createElement("span");
  tagElement.innerHTML = "working...&nbsp;";
  loader.classList.add("bulma-loader-mixin");
  tagElement.appendChild(loader);
}

function handleTagResponse(response) {
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

function handleTagError(tagElement, error) {
  console.log(error);
  tagElement.innerText = "error";
  tagElement.classList.add("is-danger");
}

function getSoReputation() {
  fetch(STACKEXAPIURL + "?site=stackoverflow&key=" + STACKEXAPIKEY)
    .then((response) => {
      return handleTagResponse(response);
    })
    .then((data) => {
      if (data.items.length > 0) {
        let repValue = data.items[0].reputation;
        repTag.innerText = repValue.toLocaleString();
        repTag.classList.add("is-black");
      }
    })
    .catch((error) => {
      handleTagError(repTag, error);
    });
}

function getSoTags(nTags) {
  var SOUSERURL = "https://stackoverflow.com/search?q=user:8512262";
  fetch(STACKEXAPIURL + "/tags?site=stackoverflow&key=" + STACKEXAPIKEY)
    .then((response) => {
      return handleTagResponse(response);
    })
    .then((data) => {
      if (data.items.length > 0) {
        // hide placeholder
        phTag.style.display = "none";
        // load tags
        let topTagNames = data.items.slice(0, nTags).map((tag) => tag.name);
        let tagContainer = document.getElementById("topTags");
        topTagNames.forEach((tag) => {
          let tagLink = document.createElement("a");
          tagLink.href = `${SOUSERURL}+[${tag}]`;
          tagLink.target = "_blank";
          tagLink.innerText = tag;
          tagLink.classList.add("tag", "is-info");
          tagContainer.appendChild(tagLink);
        });
      }
    })
    .catch((error) => {
      handleTagError(phTag, error);
    });
}
