$(document).ready(() => {
  const ticketData = JSON.parse(window.localStorage.getItem('ticketData'));
  console.log(ticketData);
  const basePrice = Number.parseInt(ticketData.basePrice);
  const luggageType = $('input[name=luggage]');
  const priceSpan = $('span.price');
  let luggagePrice = 750000;
  priceSpan.text(`${basePrice + luggagePrice} VNĐ`);

  luggageType.on('click', (event) => {
    console.log(basePrice);
    luggagePrice = Number.parseInt(event.target.value) + basePrice;
    priceSpan.text(`${luggagePrice} VND`);
  });

  const nextPage = () => {
    console.log('test');
    ticketData.luggagePrice = luggagePrice;
    window.localStorage.setItem('ticketData', JSON.stringify(ticketData));
    window.location = '/seatbooking';
  };

  $('.btn-continue').on('click', nextPage);
});
