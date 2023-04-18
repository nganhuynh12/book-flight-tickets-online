$(document).ready(() => {
  const basePrice = 400;
  const luggageType = $('input[name=luggage]');
  const priceSpan = $('span.price');

  console.log(luggageType);
  luggageType.on('click', (event) => {
    console.log(event.target.value + basePrice, priceSpan);
    priceSpan.text(`${Number.parseInt(event.target.value) + basePrice} VNĐ`);
  });
});
