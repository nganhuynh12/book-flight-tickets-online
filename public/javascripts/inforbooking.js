$(document).ready(() => {
  const ticketData = JSON.parse(window.localStorage.getItem('ticketData'));
  const priceSpan = $('.price');
  const basePriceSpan = $('#basePrice');
  const luggagePriceSpan = $('#luggagePrice');
  const seatPriceSpan = $('#seatPrice');
  const modalTitleSpan = $('h5.modal-title');
  const submitButton = $('#submitButton');
  const userId = $('#userId').val();
  const emailInput = $('input[name=email]');
  const phoneInput = $('input[name=phonenumber]');
  const firstNameInput = $('input[name=firstname]');
  const lastnameInput = $('input[name=lastname]');
  const addressInput = $('input[name=address]');
  console.log(userId);

  console.log(ticketData);

  basePriceSpan.text(
    Intl.NumberFormat('VND', { style: 'currency', currency: 'VND' }).format(
      Number.parseInt(ticketData.basePrice)
    )
  );

  luggagePriceSpan.text(
    Intl.NumberFormat('VND', { style: 'currency', currency: 'VND' }).format(
      ticketData.luggagePrice
    )
  );

  seatPriceSpan.text(
    Intl.NumberFormat('VND', { style: 'currency', currency: 'VND' }).format(
      ticketData.seatPrice
    )
  );

  modalTitleSpan.text(
    `Chuyến bay từ ${ticketData.flight.startLocation.value} đến ${
      ticketData.flight.arriveLocation.value
    } - ${new Date(ticketData.flight.startTime).toUTCString()}`
  );

  const ticketPriceText = Intl.NumberFormat('VND', {
    style: 'currency',
    currency: 'VND',
  }).format(ticketData.luggagePrice + ticketData.seatPrice);
  priceSpan.text(ticketPriceText);

  submitButton.on('click', () => {
    ticketData.seatList.forEach(async function (seat) {
      let data = {};
      if (userId !== '') {
        data = {
          type: 1,
          price: ticketData.seatPrice + ticketData.basePrice,
          flightId: ticketData.flight.id,
          seatId: seat,
          luggagePrice: ticketData.luggagePrice,
          email: emailInput.val(),
          phone: phoneInput.val(),
          username: lastnameInput.val() + ' ' + firstNameInput.val(),
          address: addressInput.val(),
          userId,
        };
      } else {
        data = {
          type: 1,
          price: ticketData.seatPrice + ticketData.basePrice,
          flightId: ticketData.flight.id,
          seatId: seat,
          luggagePrice: ticketData.luggagePrice,
          email: emailInput.val(),
          phone: phoneInput.val(),
          username: lastnameInput.val() + ' ' + firstNameInput.val(),
          address: addressInput.val(),
        };
      }

      const res = await $.post('/tickets', data);

      console.log(res);
    });
  });
});
