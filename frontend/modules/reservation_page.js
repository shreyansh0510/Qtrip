import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    let response = await fetch(`${config.backendEndpoint}/reservations/`)
    let result = await response.json()
    return result
  } catch (error) {
    return null
  }
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table
  reservations.map((reservation, index) => {
    let ele = document.createElement("tr");
    ele.innerHTML =
    `<tr scope="row" key=${reservation.id} >
      <td>${reservation.id}</td>
      <td>${reservation.name}</td>
      <td>${reservation.adventureName}</td>
      <td>${reservation.person}</td>
      <td>${new Date(reservation.date).toLocaleDateString("en-IN")}</td>
      <td>${reservation.price}</td>
      <td>${new Date(reservation.time).toLocaleString("en-IN", {
        year: "numeric",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      }).replace(" at",",")}</td>
      <td>
        <div class="reservation-visit-button" id=${reservation.id} >
          <a href=detail/?adventure=${reservation.adventure}>
            Visit Adventure
          </a>
        </div>
      </td>
    </tr>`

    document.getElementById("reservation-table").appendChild(ele);
  })


  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length) {
    document.getElementById("no-reservation-banner").style.display = "none"
    document.getElementById("reservation-table-parent").style.display = "block"
  } else {
    document.getElementById("no-reservation-banner").style.display = "block"
    document.getElementById("reservation-table-parent").style.display = "none"
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page
    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
}

export { fetchReservations, addReservationToTable };
