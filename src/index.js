function main() {
    document.addEventListener("DOMContentLoaded", () => {
        listDoggos();
        getDogInfo();
        addToggleBtn();
    });
}

function listDoggos() {
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(json => addPupSpan(json));
}

function addPupSpan(json) {
    const dogBar = document.querySelector('#dog-bar')
    for(const pup of json) {
        dogBar.insertAdjacentHTML('beforeend', 
        `
            <span data-id=${pup['id']}>${pup['name']}</span>
        `)
    }
}

function getDogInfo() {
    fetch('http://localhost:3000/pups')
    .then(resp => resp.json())
    .then(json => addDogInfoListener(json));
}

function addDogInfoListener(json) {
    document.addEventListener('click', (event) => {
        if(event.target.tagName === "SPAN") {
            showDogInfo(json);
        }
    });
}

function showDogInfo(json) {
    const infoDiv = document.querySelector('#dog-info');
    const el = event.target;
    if(el.name === event.target.innerHtml) {
        const dog = json[`${el.dataset.id - 1}`];
        const isGood = dog.isGoodDog;
        let good = ''
        if(isGood === true) {
            good = "Good Dog!";
        } else {
            good = "Bad Dog!";
        } 

        infoDiv.innerHTML = '';
        infoDiv.insertAdjacentHTML('beforeend', 
        `
            <img src="${dog['image']}">
            <h2>${dog['name']}</h2>
            <button id="good-bad" data-id="${dog['id']}" data-goodboi="${isGood}">${good}</button>
        `);
    }
}

function addToggleBtn() {
    document.addEventListener('click', (event) => {
        if(event.target.id === 'good-bad' && event.target.innerHTML === 'Good Dog!') {
            event.target.innerHTML = "Bad Dog!";
            updateDog(event.target);
        } else if(event.target.id === 'good-bad' && event.target.innerHTML === 'Bad Dog!') {
            event.target.innerHTML = "Good Dog!"
            updateDog(event.target);
        }
    });
}

function updateDog(target) {
    let dogType = ''
    console.log(typeof target.dataset.goodboi)
    if(target.dataset.goodboi === 'true'){
        target.dataset.goodboi = 'false'
        dogType = false

    } else if(target.dataset.goodboi === 'false') {
        target.dataset.goodboi = 'true'
        dogType = true
    }
    console.log(dogType)
    fetch(`http://localhost:3000/pups/${target.dataset.id}`, {
        method: 'PATCH',
        headers: {
            "Content-Type": 'application/json'
        },
        body: JSON.stringify({
            'id': target.dataset.id,
            'isGoodDog': dogType
        })
    })
}

main();