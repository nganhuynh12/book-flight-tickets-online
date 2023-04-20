$(document).ready(() => {
  const ticketData = JSON.parse(window.localStorage.getItem('ticketData'));
  console.log(ticketData);
  const basePrice = Number.parseInt(ticketData.basePrice);
  const luggageType = $('input[name=luggage]');
  const priceSpan = $('span.price');
  let luggagePrice = 750000;
  let luggagePriceText = Intl.NumberFormat('VND', {
    style: 'currency',
    currency: 'VND',
  }).format(luggagePrice + basePrice);

  priceSpan.text(`${luggagePriceText}`);

  luggageType.on('click', (event) => {
    luggagePrice = Number.parseInt(event.target.value) + basePrice;
    let luggagePriceText = Intl.NumberFormat('VND', {
      style: 'currency',
      currency: 'VND',
    }).format(luggagePrice);

    priceSpan.text(`${luggagePriceText}`);
  });

  const nextPage = () => {
    ticketData.luggagePrice = luggagePrice;
    window.localStorage.setItem('ticketData', JSON.stringify(ticketData));
    window.location = '/seatbooking';
  };

  $('.btn-continue').on('click', nextPage);
});
