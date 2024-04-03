import config from "../conf/index.js";

async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();

  //Updates the DOM with the cities
  if (cities) {
    cities.forEach((key) => {
      addCityToDOM(key.id, key.city, key.description, key.image);
    });
  }
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try {
    let response = await fetch(`${config.backendEndpoint}/cities`);
    let result = await response.json();
    return result;
  } catch (error) {
    // console.log(error);
    return null;
  }
}

let cityCardsAll = "";

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const cityCard = `
    <a href=pages/adventures/?city=${id} id=${id}>
      <div class="card col-6 col-md-3 position-relative m-0.5 p-0">
          <img class="card-img-top" style="height: 100%"  src=${image} alt=${description}>
          <div class="card-body position-absolute text-center text-white" style="bottom: 0">
            <h5 class="card-title">${city}</h5>
            <p class="card-text">${description}</p>
          </div>
      </div>
    <a/>
  `;
  // console.log("cityCard", cityCard)
  cityCardsAll = cityCardsAll.concat(cityCard);
  // console.log("cityCardsAll", cityCardsAll)
  return (document.getElementById("data").innerHTML = cityCardsAll);
}

export { init, fetchCities, addCityToDOM };
