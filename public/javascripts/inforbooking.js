$(document).ready(() => {
  const ticketData = JSON.parse(window.localStorage.getItem('ticketData'));
  const priceSpan = $('.price');
  console.log(ticketData);

  const ticketPriceText = Intl.NumberFormat('VND', {
    style: 'currency',
    currency: 'VND',
  }).format(ticketData.luggagePrice + ticketData.seatPrice);
  priceSpan.text(ticketPriceText);
});
