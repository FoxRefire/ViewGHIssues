// ==UserScript==
// @name        View Github Issues&PR
// @namespace   Violentmonkey Scripts
// @match       https://github.com/*
// @grant       none
// @version     1.0
// @author      FoxRefire
// @description 2024/9/21 4:35:01
// ==/UserScript==
const actions = [
    {
        "name": "View issues",
        "href": "/issues?q=is%3Aissue+author%3A$USER"
    },
    {
        "name": "View pull requests",
        "href": "/pulls?q=is%3Apr+author%3A$USER"
    }
]

function waitTargetElement(){
    return new Promise(resolve => {
        let interval = setInterval(() => {
            let target  = document.querySelector(".js-user-profile-bio")
            if(target){
                resolve(target)
                clearInterval(interval)
            }
        }, 150)
    })
}

async function main(user){
    let target = await waitTargetElement()
    actions.forEach(action => {
        let href = action.href.replace("$USER", user)
        target.insertAdjacentHTML("beforebegin", `
            <div class="mb-3">
                <a href="${href}">
                    <button name="button" type="button" class="btn btn-block">${action.name}</button>
                </a>
            </div>
        `)
    })
}

let urlPath = new URL(location.href).pathname.slice(1)
if(urlPath.split("/").length === 1){
    let user = urlPath
    main(user)
}
