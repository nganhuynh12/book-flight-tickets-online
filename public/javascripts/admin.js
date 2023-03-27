$(document).ready(() => {
  const btnAddFlight = $('#btn-add-flight');
  const showAddFlight = $('#add-flight-form');
  const hideAddFlight = $('#close-add-flight-form');
  const sidebarElement = $("div[id^='sidebar']");

  sidebarElement.each((index, element) => {
    $(element).on('click', () => {
      const id = element.id;
      openTabs(id.slice(id.indexOf('-') + 1, id.length));
    });
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
  const openTabs = (tabName) => {
    const tabList = $('.tabs');
    tabList.each((index, element) => {
      console.log(element.style);
      element.style.display = 'none';
    });
    $(`#${tabName}`)[0].style.display = 'block';

    if (tabName === 'place') {
      loadLocationTable();
    }
  };

  /* Thêm chuyến bay */
  btnAddFlight.on('click', showAddFlightForm);
  hideAddFlight.on('click', hideAddFlightForm);

  const showAddFlightForm = () => {
    showAddFlight.classList.add('show');
    setTimeout(function () {
      document.querySelector('#add-flight-form form').classList.add('show');
    }, 50);
  };

  /* Ẩn form chuyến bay */
  const hideAddFlightForm = () => {
    document.querySelector('#add-flight-form form').classList.remove('show');
    setTimeout(function () {
      document.getElementById('add-flight-form').classList.remove('show');
    }, 300);
  };

  //Ẩn form khi click vào vùng ngoài form
  window.onclick = function (event) {
    if (event.target == showAddFlight) {
      hideAddFlightForm();
    }
  };

  /* Xem thông tin chi tiết chuyến bay */
  const showFlightDetails = () => {
    let dialog = document
      .getElementById('flight-details')
      .querySelector('.dialog');
    dialog.classList.add('show');
    setTimeout(function () {
      dialog.focus();
    }, 6000); // focus on dialog after animation completes
    document.getElementById('flight-details').classList.add('show');
  };

  const hideFlightDetails = () => {
    let dialog = document
      .getElementById('flight-details')
      .querySelector('.dialog');
    dialog.classList.remove('show');
    document.getElementById('flight-details').classList.remove('show');
  };

  /* Chỉnh sửa thông tin chuyến bay */

  const loadLocationTable = async () => {
    const locationData = await $.get('http://localhost:3000/locations');
    const tbody = $('#place').find('tbody');
    if (locationData.length > 0) {
      let count = 1;
      locationData.forEach((location, index) => {
        tbody.append(
          `<tr>
          <td>${index}</td>
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
      });
    }
  };
});
