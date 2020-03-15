const main = () => {
    document.addEventListener('DOMContentLoaded', (event) => {
         fetchDogs();
         addClickListener();
    })
}

const addClickListener = () => {
    document.addEventListener("click", (event) => {
        if (event.target.tagName === "SPAN"){
            fetchDogInfo(event.target);
        } 
        else if (event.target.className === "change-status"){
            updateStatus(event.target);
        }
        else if (event.target.className === "good-dog-filter"){
            changeDogBar(event.target);
        }
        else if (event.target.innerHTML === "Filter good dogs: OFF"){
            event.target.innerHTML = "Filter good dogs: ON"
            fetchGoodDogs();
        }
        else if (event.target.innerHTML === "Filter good dogs: ON"){
            event.target.innerHTML = "Filter good dogs: OFF"
            fetchDogs();
        }
    })
}

const fetchGoodDogs = () => {
    const bar = document.getElementById("dog-bar");
    bar.innerHTML = "";

    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => json.forEach(dog => addGoodDogsToBar(dog)))
}

const addGoodDogsToBar = (dog) => {
    if (dog.isGoodDog){
    const bar = document.getElementById("dog-bar");

    const span = document.createElement("span")
    span.className = `${dog.id}-dog-bar`;
    span.innerHTML = dog.name;

    bar.append(span);
    }
}

const updateStatus = (target) => {
    const id = parseInt(target.id)
    let dogStatus;

    if (target.innerHTML === "Bad Dog!"){
        dogStatus = false;
    }
    else{
        dogStatus = true;
    }

    fetch(`http://localhost:3000/pups/${id}`, {
        method: "PATCH",
        headers:{
            "Content-Type": "application/json",
            Accept: "application/json"
        },
        body: JSON.stringify({
            isGoodDog: !dogStatus
        })
    })
    .then(resp => resp.json())
    .then(json => changeButton(target, json))
}

const changeButton = (target, dog) => {
    const filter = document.getElementById("good-dog-filter");
    const bar = document.getElementById("dog-bar");

    if (dog.isGoodDog){
        target.innerHTML = "Good Dog!"
        if (filter.innerHTML === "Filter good dogs: ON"){
            const id = parseInt(target.id); 
            const name = dog.name
            addToDogBar(id, name);
        }
    }
    else {
        target.innerHTML = "Bad Dog!"
        if (filter.innerHTML === "Filter good dogs: ON"){
            const id = parseInt(target.id);
            removeFromDogBar(id); 
        }
    }
}

const addToDogBar = (id, name) => {
    const dogBar = document.getElementById("dog-bar");

    const span = document.createElement("span")
    span.className = `${id}-dog-bar`;
    span.innerHTML = name;

    dogBar.append(span)
}

const removeFromDogBar = (id) => {
    const dogBar = document.getElementById("dog-bar");
    const dog = dogBar.getElementsByClassName(`${id}-dog-bar`)[0];
    dogBar.removeChild(dog);
}

const fetchDogInfo = (target) => {
    const id = parseInt(target.className);

    fetch(`http://localhost:3000/pups/${id}`)
    .then(resp => resp.json())
    .then(json => renderDog(json));
}

const renderDog = (dog) => {
    const dogInfo = document.getElementById("dog-info")
    dogInfo.innerHTML = "";

    const img = document.createElement('img');
    img.src = dog.image;

    const h2 = document.createElement('h2');
    h2.innerHTML = dog.name;

    const btn = document.createElement('button');
    btn.className = "change-status"
    btn.id = `${dog.id}-btn-id`

    if (dog.isGoodDog){
        btn.innerHTML = "Good Dog!"
    }
    else {
        btn.innerHTML = "Bad Dog!"

    }

    dogInfo.append(img, h2, btn);
}

const fetchDogs = () => {
    const bar = document.getElementById("dog-bar");
    bar.innerHTML = "";

    fetch("http://localhost:3000/pups")
    .then(resp => resp.json())
    .then(json => json.forEach(dog => addDogToBar(dog)))
}

const addDogToBar = (dog) => {
    const bar = document.getElementById("dog-bar");

    const span = document.createElement("span")
    span.className = `${dog.id}-dog-bar`;
    span.innerHTML = dog.name;

    bar.append(span);
}

const isFilterOn = () => {
    
}

main()