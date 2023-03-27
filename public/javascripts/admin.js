var btnAddFlight = document.getElementById('btn-add-flight');
var showAddFlight = document.getElementById('add-flight-form');
var hideAddFlight = document.getElementById('close-add-flight-form');

//Chuyển tab khi click vào sidebar
document.getElementById('sidebar-home').addEventListener('click', () => {
  openTabs('dashboard');
});
document.getElementById('sidebar-flight').addEventListener('click', () => {
  openTabs('flight');
});
document.getElementById('sidebar-out-flight').addEventListener('click', () => {
  openTabs('out-flight');
});
document.getElementById('sidebar-place').addEventListener('click', () => {
  openTabs('place');
});
document.getElementById('sidebar-customer').addEventListener('click', () => {
  openTabs('customer');
});
document.getElementById('sidebar-ticket').addEventListener('click', () => {
  openTabs('ticket');
});
document.getElementById('sidebar-statistical').addEventListener('click', () => {
  openTabs('statistical');
});

//Chuyển tab khi click vào viewall
document.getElementById('openFlight').addEventListener('click', () => {
  openTabs('flight');
});
document
  .getElementById('openOutstadingFlight')
  .addEventListener('click', () => {
    openTabs('out-flight');
  });
document.getElementById('openPlace').addEventListener('click', () => {
  openTabs('place');
});
document.getElementById('openCustomer').addEventListener('click', () => {
  openTabs('customer');
});
document.getElementById('openTicket').addEventListener('click', () => {
  openTabs('ticket');
});
document.getElementById('openStatistical').addEventListener('click', () => {
  openTabs('statistical');
});

//Hàm chuyển tab
function openTabs(tabName) {
  var i;
  var x = document.getElementsByClassName('tabs');
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  document.getElementById(tabName).style.display = 'block';

  if (tabName === 'place') {
    loadLocationTable();
  }
}

/* Thêm chuyến bay */
btnAddFlight.addEventListener('click', showAddFlightForm);
hideAddFlight.addEventListener('click', hideAddFlightForm);

function showAddFlightForm() {
  showAddFlight.classList.add('show');
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

//Ẩn form khi click vào vùng ngoài form
window.onclick = function (event) {
  if (event.target == showAddFlight) {
    hideAddFlightForm();
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

const loadLocationTable = async () => {
  const locationData = await $.get('http://localhost:3000/locations');
  const tbody = $('tbody');
  if (locationData.length > 0) {
    let count = 1;
    locationData.forEach((location) => {
      console.log(location);
      tbody.append(
        `<tr>
          <td>${count}</td>
          <td>${location.value}</td>
          <td>
            <button class='btn-view'><span class='fa fa-eye'></span></button>
            <button class='btn-edit'><span class='fa fa-pencil'></span></button>
            <button class='btn-delete'><span
              class='fa fa-trash'
            ></span></button> 
          </td>
        </tr>`
      );
      count++;
    });
  }
};
