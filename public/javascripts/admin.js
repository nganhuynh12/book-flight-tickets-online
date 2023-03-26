function openTabs(tabName) {
  var i;
  var x = document.getElementsByClassName('tabs');
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  document.getElementById(tabName).style.display = 'block';
}

/* Thêm chuyến bay */
function showAddFlightForm() {
  document.getElementById('add-flight-form').classList.add('show');
  setTimeout(function () {
    document.querySelector('#add-flight-form form').classList.add('show');
  }, 50);
}

/* Ẩn form chuyến bay */
function hideAddFlightForm() {
  document.querySelector('#add-flight-form form').classList.remove('show');
  setTimeout(function () {
    document.getElementById('add-flight-form').classList.remove('show');
  }, 300);
}

var modal = document.getElementById('add-flight-form form');
window.onclick = function (event) {
  if (event.target == modal) {
    modal.display.style = 'none';
  }
};

/* Xem thông tin chi tiết chuyến bay */
function showFlightDetails() {
  let dialog = document
    .getElementById('flight-details')
    .querySelector('.dialog');
  dialog.classList.add('show');
  setTimeout(function () {
    dialog.focus();
  }, 6000); // focus on dialog after animation completes
  document.getElementById('flight-details').classList.add('show');
}

function hideFlightDetails() {
  let dialog = document
    .getElementById('flight-details')
    .querySelector('.dialog');
  dialog.classList.remove('show');
  document.getElementById('flight-details').classList.remove('show');
}

/* Chỉnh sửa thông tin chuyến bay */

document.getElementById('openFlight').addEventListener('click', () => {
  console.log('test');
  openTabs('flight');
});
