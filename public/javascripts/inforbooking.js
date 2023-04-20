$(document).ready(() => {
  const ticketData = JSON.parse(window.localStorage.getItem('ticketData'));
  const priceSpan = $('.price');
  const basePriceSpan = $('#basePrice');
  const luggagePriceSpan = $('#luggagePrice');
  const seatPriceSpan = $('#seatPrice');
  const modalTitleSpan = $('h5.modal-title');
  console.log(ticketData);

  basePriceSpan.text(
    Intl.NumberFormat('VND', { style: 'currency', currency: 'VND' }).format(
      ticketData.basePrice
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
});
