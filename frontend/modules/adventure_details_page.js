import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let index = search.indexOf("=");
  let id = search.slice(index + 1);
  return id;
}

//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try {
    let response = await fetch(
      `${config.backendEndpoint}/adventures/detail?adventure=${adventureId}`
    );
    let result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  document.getElementById("adventure-name").innerHTML = `${adventure.name}`;
  document.getElementById(
    "adventure-subtitle"
  ).innerHTML = `${adventure.subtitle}`;
  document.getElementById(
    "adventure-content"
  ).innerHTML = `${adventure.content}`;

  let photos = "";
  adventure.images &&
    adventure.images.map((image) => {
      photos = photos.concat(
        `<img src=${image} class="activity-card-image" />`
      );
    });
  document.getElementById("photo-gallery").innerHTML = photos;
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  document.getElementById("photo-gallery").innerHTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators">
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
  </div>
  <div class="carousel-inner" id="myDiv"></div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
  </div>`;

  images.map((image, index) => {
    let ele = document.createElement("div")
    ele.classList.add("carousel-item")
    index === 0 && ele.classList.add("active")
    ele.innerHTML = `<img class="w-100" src=${image}>`
    document.getElementById("myDiv").appendChild(ele)
  });
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if (adventure.available) {
    document.getElementById("reservation-panel-sold-out").style.display = "none"
    document.getElementById("reservation-panel-available").style.display = "block" 
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead
  } else {
    document.getElementById("reservation-panel-available").style.display = "none" 
    document.getElementById("reservation-panel-sold-out").style.display = "block"
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let totalCost = adventure.costPerHead * persons
  document.getElementById("reservation-cost").innerHTML = totalCost

}


//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById("myForm")
  
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    let formData = JSON.stringify({
      name : form.elements.name.value,
      date: form.elements.date.value,
      person: form.elements.person.value,
      adventure: adventure.id
    })

    try {
      let response = await fetch(`${config.backendEndpoint}/reservations/new`, {
        method : "POST",
        body: formData,
        headers : {
          "Content-Type" : "application/json"
        }
      })
      if (response.ok) {
        let result = await response
        console.log("success", result)
        alert("Success!") 
      } else {
        let result = await response
        console.log("failed", result)
        alert("Failed!")
      }
    } catch (error) {
      alert("Failed!")
      return null
    }
  }) 
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  adventure.reserved ? 
    document.getElementById("reserved-banner").style.display = "block" 
    : document.getElementById("reserved-banner").style.display = "none" 

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
