function e(){console.log("party time!"),confetti({particleCount:256,spread:128,origin:{y:.5},shapes:["circle","square","triangle"],colors:["hsl(171, 100%, 41%)","hsl(217, 71%, 53%)","hsl(48, 100%, 67%)","hsl(348, 100%, 61%)","hsl(271, 100%, 67%)"]})}var t,r=document.getElementById("reputationTag");document.getElementById("placeholderTag"),t=document.createElement("span"),r.innerHTML="working...&nbsp;",t.classList.add("bulma-loader-mixin"),r.appendChild(t),document.addEventListener("DOMContentLoaded",()=>{fetch("https://api.stackexchange.com/2.3/users/8512262?site=stackoverflow&key=)q0PGY5frwc43NqR*gt6hQ((").then(e=>(function(e){if(!e.ok)throw Error("Network response was not ok");return e.json()})(e)).then(e=>{if(e.items.length>0){var t=e.items[0].reputation;r.innerText=t.toLocaleString(),r.classList.add("is-black")}}).catch(e=>{console.log(e),r.innerText="error",r.classList.add("is-danger")}),function(e){let t=["ArrowUp","ArrowUp","ArrowDown","ArrowDown","ArrowLeft","ArrowRight","ArrowLeft","ArrowRight","b","a","Enter"];var r=0;document.addEventListener("keyup",n=>{n.key===t[r]?r++:r=0,r===t.length&&(r=0,e())})}(e)});
//# sourceMappingURL=index.af460a84.js.map