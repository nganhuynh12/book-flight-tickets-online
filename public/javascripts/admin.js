$(document).ready(() => {
  const btnAddFlight = $('#btn-add-flight');
  const btnHideForm = $('.form-close');
  const prefixList = ['sidebar', 'Opentab'];
  const addFlightForm = $('#add-flight-form');
  const updateFlightForm = $('#update-flight-form');
  const updateTicketForm = $('#update-ticket-form');
  const btnViewFlightDetail = $('.btn-view');
  const btnCloseDialog = $('.btn-close-dialog');
  const btnAddPlace = $('#btn-add-place');
  let formName = '';
  let dialogID = '';

  prefixList.forEach((prefix) => {
    const elementList = $(`div[id^=${prefix}]`);

    elementList.each((index, element) => {
      $(element).on('click', () => {
        const id = element.id;
        openTabs(id.slice(id.indexOf('-') + 1, id.length));
      });
    });
  });

  const loadLocationTable = async () => {
    const selectField = ['value'];
    const result = await $.get('http://localhost:3000/locations');
    const table = $('#place table');
    const tbody = $('<tbody></tbody>');
    $.each(result, (index, data) => {
      tbody.append(
        `<tr><td>${index}</td>${$.map(selectField, (field) => {
          return `<td>${data[field]}</td>`;
        })}
          <td>
             <button class='btn-edit' id='btn-update-place'><span class='fa fa-pencil'></span></button>
             <button class='btn-delete' id='btn-delete-place'><span
               class='fa fa-trash'
            ></span></button>
           </td>
        </tr>`
      );
    });
    table.empty();
    table.append(
      `<thead style="background-color: var(--main-color)"><tr><th>ID</th>${$.map(
        selectField,
        (value) => {
          console.log('value', value);
          return `<th>${value}</th>`;
        }
      )}<th>action</th></tr></thead>`,
      tbody
    );
    // if (locationData.length > 0) {
    //   locationData.forEach((location, index) => {
    //     $('<tr></tr>').html('td');
    //     tbody.append(
    //       `<tr>
    //       <td>${index}</td>
    //       <td>${location.value}</td>
    //     </tr>`
    //     );
    //   });
    // }
    $.each(result, (index, data) => {
      console.log(data, table);
    });
  };

  //Hàm chuyển tab
  const openTabs = (tabName) => {
    const tabList = $('.tabs');
    const tabActive = $('.menu-items');
    let indexTab;
    tabList.each((index, element) => {
      element.style.display = 'none';
    });
    $(`#${tabName}`)[0].style.display = 'block';

    tabActive.each((index, element) => {
      const id = element.id;
      if (tabName === id.slice(id.indexOf('-') + 1, id.length)) {
        indexTab = index;
      }
      element.classList.remove('active');
    });
    tabActive[indexTab].classList.add('active');

    if (tabName === 'place') {
      loadLocationTable();
    }
  };

  /* Thêm chuyến bay */
  btnAddFlight.on('click', showAddFlightForm);
  btnHideForm.on('click', function(){
    hideForm();
    hideDialog();
  });

  btnViewFlightDetail.on("click",function(){
    showDialog();
  });

  $("body").on("click", ".btn-delete",function(){
    var id = $(this).attr('id');
    console.log(id);
    var currentRow = $(this).closest("tr");;
    dialogID = id.slice(id.indexOf('-') + 1, id.length);
    if(dialogID.includes('flight')){
      var idFlight = currentRow.find("td:eq(0)").html();
      $('#flightID').html(idFlight);
    }else if(dialogID.includes('place')){
      var placeName = currentRow.find("td:eq(1)").html();
      $('#placeName').html(placeName);
    }else if(dialogID.includes('customer')){
      var customerName = currentRow.find("td:eq(1)").html();
      $('#customerName').html(customerName);
    }
    showDialog();
  });

  btnCloseDialog.on("click",hideDialog);

  btnAddPlace.on("click",function(){
    var id = btnAddPlace.attr('id')
    dialogID = id.slice(id.indexOf('-') + 1, id.length);
    showDialog();
  })

  $("body").on("click", ".btn-edit", function() {
    var id = $(this).attr('id');
    if(id.includes('flight')){
      showUpdateFlightForm();
    }else{
      dialogID = id.slice(id.indexOf('-') + 1, id.length);
      showDialog();
    }
    
  });

  function showAddFlightForm() {
    formName = '#' + addFlightForm.attr('id');
    addFlightForm.css("display","block");
    setTimeout(function () {
      document.querySelector('#add-flight-form form').classList.add('show');
    }, 50);
  };

  function showUpdateFlightForm() {
    formName = '#' + updateFlightForm.attr('id');
    updateFlightForm.css("display","block");
    setTimeout(function () {
      document.querySelector('#update-flight-form form').classList.add('show');
    }, 50);
  };

  /* Ẩn form chuyến bay */
  function hideForm(){
    document.querySelector(formName + ' form').classList.remove('show');
    setTimeout(function () {
      $(formName).css("display","none");
    }, 300);
  };

  //Ẩn form khi click vào vùng ngoài form
  $(document).on("click", function(event){
    var formID = formName.slice(formName.indexOf('#') + 1, formName.length);
    if (event.target.id == formID) {
      hideForm();
    }
  })

  /* Xem thông tin chi tiết chuyến bay */
  function showDialog() {
    let dialog = document
      .getElementById(dialogID)
      .querySelector('.dialog');
    dialog.classList.add('show');
    setTimeout(function () {
      dialog.focus();
    }, 6000); // focus on dialog after animation completes
    document.getElementById(dialogID).classList.add('show');
  };

  function hideDialog() {
    let dialog = document
      .getElementById(dialogID)
      .querySelector('.dialog');
    dialog.classList.remove('show');
    document.getElementById(dialogID).classList.remove('show');
  };

  /* Chỉnh sửa thông tin chuyến bay */
});