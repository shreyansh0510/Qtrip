import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let equalIndex = search.indexOf("=")
  let searchCity = search.substring(equalIndex + 1)
  return searchCity
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try {
    let response = await fetch(`${config.backendEndpoint}/adventures?city=${city}`)
    let result = await response.json()
    return result
  } catch (error) {
    return null
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM


  let adventureCards = ""

  adventures.map((adventure) => {
    let card = `<a href=detail/?adventure=${adventure.id} id=${adventure.id}>
        <div class="activity-card col-6 col-md-3 position-relative m-0.5 p-0">
            <img class="activity-card img w-100" style="height: 100%"  src=${adventure.image} alt=${adventure.name}>
            <div class="category-banner">${adventure.category}</div>
            <div class="card-body text-black w-100">
              <div class="d-flex justify-content-between">
                <p>${adventure.name}</p>
                <p>${adventure.costPerHead}</p>
              </div>
              <div class="d-flex justify-content-between">
                <p>Duration</p>
                <p>${adventure.duration} Hours</p>
            </div>

            </div>
        </div>
    <a/>`
    adventureCards = adventureCards.concat(card);
    return adventureCards
  })

  return (document.getElementById("data").innerHTML = adventureCards);

} 

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  console.log("filterByDuration", low, high)
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  const filteredList = list.filter((items) => {
    return items.duration >= low && items.duration <= high
  })
  console.log("filteredList", filteredList)
  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  const filteredList = list.filter((items) => {
    return categoryList.includes(items.category)
  })
  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  console.log("filterFunction", list)
  // debugger
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  const filtersCategories = filters.category;

  

  if(filters.category.length &&  !filters.duration) {
    return filterByCategory(list, filtersCategories)

  } else if (!filters.category.length && filters.duration) {
    let index = filters.duration.indexOf("-")
    let start = filters.duration.slice(0, index)
    let end = filters.duration.slice(index + 1, )
    return filterByDuration(list, start, end)

  } else if(filters.category.length && filters.duration) { 
    let index = filters.duration.indexOf("-")
    let start = filters.duration.slice(0, index)
    let end = filters.duration.slice(index + 1, )
    const durationData = filterByDuration(list, start, end)
    return filterByCategory(durationData, filtersCategories);
    // return list
  } else {
    return list
  }

  // Place holder for functionality to work in the Stubs
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  localStorage.setItem("filters", JSON.stringify(filters))
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object
  let filters = JSON.parse(localStorage.getItem("filters"))
  // Place holder for functionality to work in the Stubs
  return filters;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // console.log("generateFilterPillsAndUpdateDOM");
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // console.log("generateFilterPillsAndUpdateDOM", filters.category)
  let pills = "";
  filters.category.map((items) => {
    let pill = `
    <div class="category-filter">${items}</div>
    `
    pills = pills.concat(pill)
    return pills
  })



  return  (
    document.getElementById("category-list").innerHTML = pills,
    document.getElementById("duration-select").value = filters.duration
  )
}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
