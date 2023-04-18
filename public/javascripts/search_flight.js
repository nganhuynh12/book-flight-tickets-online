$(document).ready(async () => {
  const locationList = await $.get('/locations');
  const startLocationSelect = $('#startLocationSelect');
  const arriveLocationSelect = $('#arriveLocationSelect');
  const startDateInput = $('#startDateInput');
  const arriveDateInput = $('#endDateInput');
  const searchButton = $('#searchButton');
  const rightPart = $('.right');

  console.log(startDateInput, endDateInput, searchButton);
  locationList.forEach(({ value, id }) => {
    startLocationSelect.append(
      `<option value=${id} id=${id}>${value}</option>`
    );
    arriveLocationSelect.append(
      `<option value=${id} id=${id}>${value}</option>`
    );
  });

  searchButton.on('click', async () => {
    const startTime = startDateInput.val();
    const arriveTime = arriveDateInput.val();
    const startLocationId = startLocationSelect.val();
    const arriveLocationId = arriveLocationSelect.val();

    const flightList = await $.get('/flights/', {
      startLocationId,
      arriveLocationId,
    });

    flightList.forEach((flight) => {
      const arriveTime = new Date(flight.arriveTime);
      const startTime = new Date(flight.startTime);
      console.log(flight);

      rightPart.append(
        `
          <div class="card text-dark">
            <div class="card-header">
              <li>
                <div class="flight-route">
                  <div>
                    <p class="time">${startTime.getHours()}:${startTime.getMinutes()}</p>
                    <p class="time">${flight.startLocation.value}</p>
                  </div>
                  <div>
                    <span class="fa">&#xf041;</span>
                    <span class="fa fa-fighter-jet"></span>
                    <span class="fa">&#xf041;</span>
                    <br>
                  </div>
                  <div>
                    <p class="time">${arriveTime.getHours()}:${arriveTime.getMinutes()}</p>
                    <p class="time">${flight.arriveLocation.value}</p>
                  </div>

                  <div>
                    <p class="far">hm</p>
                    <p class="far">Bay thẳng</p>
                  </div>

                </div>
              </li>
            </div>
            <div class="card-body">
              <li>
                <p class="flight-list">${flight.}</p>
                <p class="flight-list">1.120.000 VNĐ</p>
                <button class="btn-seedel-ticket" data-bs-toggle="modal" data-bs-target="#seedetail">Xem chi
                  tiết</button>
                <a href="signedluggage.html" class="btn-book-ticket">Chọn vé</a>
              </li>
            </div>
          </div>

	`
      );
    });
  });
});
