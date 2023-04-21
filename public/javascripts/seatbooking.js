$(document).ready(async () => {
  const ticketData = JSON.parse(window.localStorage.getItem('ticketData'));
  const container1 = $('.container1');
  const seats = $('.row .seat:not(.occupied)');
  const priceSpan = $('.price');
  let seatPrice = 0;
  let seatList = [];
  const numSeat = 80;
  console.log(ticketData);
  const bookedTicketList = await $.get(
    `/tickets?flightId=${ticketData.flight.id}`
  );
  const bookedSeatList = bookedTicketList.map((bookedTicket) => {
    return bookedTicket.seatId;
  });
  console.log(bookedSeatList);

  let luggagePriceText = Intl.NumberFormat('VND', {
    style: 'currency',
    currency: 'VND',
  }).format(ticketData.luggagePrice);

  priceSpan.text(`${luggagePriceText}`);
  priceSpan.text();

  for (let i = 0; i < numSeat / 8; i++) {
    let temp = [];
    for (let j = 0; j < 8; j++) {
      temp.push(
        $(
          `<div class="seat ${
            bookedSeatList.includes(i * 8 + j + 1) && 'occupied'
          }" id=${i * 8 + j + 1}></div>`
        ).on('click', (event) => {
          if (
            event.target.classList.contains('seat') &&
            !event.target.classList.contains('occupied')
          ) {
            if (!event.target.classList.contains('selected')) {
              seatList.push(event.target.id);
            } else {
              seatList = seatList.filter((seat) => seat !== event.target.id);
            }
            event.target.classList.toggle('selected');
          }
          seatPriceList = seatList.map((res, seat) => {
            if (seat <= 8 * 3 + 1) {
              return 300000;
            } else {
              return 150000;
            }
          }, 0);
          seatPrice = seatList.reduce((res, seat) => {
            if (seat <= 8 * 3 + 1) {
              return res + 300000;
            } else {
              return res + 150000;
            }
          }, 0);
          priceSpan.text(
            Intl.NumberFormat('VND', {
              style: 'currency',
              currency: 'VND',
            }).format(ticketData.luggagePrice + seatPrice)
          );
        })
      );
    }

    container1.append($(`<div class="row1"></div>`).append(temp));
  }

  $('.button-continue').on('click', () => {
    ticketData.seatPrice = seatPrice;
    ticketData.seatList = seatList;

    window.localStorage.setItem('ticketData', JSON.stringify(ticketData));
    window.location = '/inforbooking';
  });
});
