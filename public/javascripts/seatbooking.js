$(document).ready(() => {
  const ticketData = JSON.parse(window.localStorage.getItem('ticketData'));
  const container1 = $('.container1');
  const seats = $('.row .seat:not(.occupied)');
  let seatList = [];
  const numSeat = 80;

  for (let i = 0; i < numSeat / 8; i++) {
    let temp = [];
    for (let j = 0; j < 8; j++) {
      temp.push(
        $(`<div class="seat" id=${i * 8 + j + 1}></div>`).on(
          'click',
          (event) => {
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
            console.log(seatList);
          }
        )
      );
    }

    container1.append($(`<div class="row1"></div>`).append(temp));
  }

  const nextPage = () => {};
  $('.button-continue').on('click', () => {
    ticketData.seatList = seatList;
    window.localStorage.setItem('ticketData', JSON.stringify(ticketData));
    window.location = '/inforbooking';
  });
});
