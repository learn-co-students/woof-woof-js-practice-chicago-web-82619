function main() {
  document.addEventListener('DOMContentLoaded', function() {
    fetchPups(); 
  })

  function fetchPups() {
    console.log('in fetchpups function')
    fetch('http://localhost:3000/pups')
      .then(resp => resp.json())
      .then(pups => {
        renderPups(pups)
      })
  }

  function renderPups(pups) {
    pups.forEach(pupObj => {
      renderPup(pupObj)
    })
    const dogFilter = document.getElementById("good-dog-filter");
    dogFilter.onclick = (event) => {
      if (event.target.innerHTML.includes("ON")) {
        event.target.innerHTML = "Filter good dogs: OFF"
        document.getElementById("dog-bar").innerHTML = '';
        pups.forEach(pupObj => {
              renderPup(pupObj)
        })
      } else {
        event.target.innerHTML = "Filter good dogs: ON"
        document.getElementById("dog-bar").innerHTML = '';
        pups.filter((pup) => pup.isGoodDog === true).forEach(pupObj => {
              renderPup(pupObj)
        })
      }
    }
  }

  function renderPup(pupObj) {
    const dogBar = document.getElementById("dog-bar");
    const newSpan = document.createElement("span");
    newSpan.onclick = (event) => {
      event.preventDefault();
      displayPup(pupObj);
    }
    newSpan.innerHTML = pupObj.name
    dogBar.append(newSpan)
  }
  
  function displayPup(pupObj) {
    const dogInfo = document.getElementById("dog-info");
    dogInfo.innerHTML = '';

    const img = document.createElement('img');
    const h2 = document.createElement('h2');
    const button = document.createElement('button');
    button.setAttribute("id", "goodToBad");
    button.onclick = (event) => {
      updatePup(pupObj);
    }
    img.src = pupObj.image;
    h2.innerText = pupObj.name;
    pupObj.isGoodDog ? button.innerHTML = "Good Dog!" : button.innerHTML = "Bad Dog!";

    dogInfo.appendChild(img);
    dogInfo.appendChild(h2);
    dogInfo.appendChild(button);
  }

  function updatePup(pupObj) {
    fetch(`http://localhost:3000/pups/${pupObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", 
        Accept: "application/json"
      },
      body: JSON.stringify({
        isGoodDog: !pupObj.isGoodDog
      })
    })
    .then(resp => resp.json())
    .then(data => {
      displayPup(data)
    })
  }

}

main()