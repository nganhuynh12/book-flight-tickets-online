$(document).ready(() => {
  const btnAddFlight = $('#btn-add-flight');
  const btnHideForm = $('.form-close');
  const prefixList = ['sidebar', 'Opentab'];
  const addFlightForm = $('#add-flight-form');
  const updateFlightForm = $('#update-flight-form');
  const updateTicketForm = $('#update-ticket-form');
  const btnCloseDialog = $('.btn-close-dialog');
  const btnAddLocation = $('#btn-add-location');
  const pagination = $('#pagination');
  let formName = '';
  let dialogID = '';
  let locationName = '';
  let page = 1;
  let pageCount = 0;

  prefixList.forEach((prefix) => {
    const elementList = $(`div[id^=${prefix}]`);

    elementList.each((index, element) => {
      $(element).on('click', () => {
        const id = element.id;
        openTabs(id.slice(id.indexOf('-') + 1, id.length));
      });
    });
  });

  pagination.on('click','.pagination-link',function(){
    $('.pagination-link').removeClass('active');
    $(this).addClass('active');
    page = $(this).html();
    loadLocationTable();
  })

  const loadLocationTable = async () => {
    const selectField = ['value'];
    const result = await $.get('/locations',{ page: page, per_page: 6});
    pageCount = result.page_count;
    const table = $('#location table');
    const tbody = $('<tbody></tbody>');
    $.each(result.rows, (index, data) => {
      tbody.append(
        `<tr id="${data.id}"><td>${index}</td>${$.map(selectField, (field) => {
          return `<td>${data[field]}</td>`;
        })}
          <td>
             <button class='btn-edit' id='btn-update-location'><span class='fa fa-pencil'></span></button>
             <button class='btn-delete' id='btn-delete-location'><span
               class='fa fa-trash'
            ></span></button>
           </td>
        </tr>`
      );
    });
    table.empty();
    table.append(
      `<thead><tr><th>ID</th>${$.map(
        selectField,
        (value) => {
          return `<th>${value}</th>`;
        }
      )}<th>action</th></tr></thead>`,
      tbody
    );
    return pageCount;
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
  };

  async function createPageLink(){
    const pageTotal = await loadLocationTable();
    var pageLink = '';
    pageLink += `<a class='pagination-link'><<</a>`;
    pageLink += `<a class='pagination-link'><</a>`;
    for(let i = 1; i <= pageTotal; i++){
      if (i == 1){
        pageLink += `<a class='pagination-link active'> ${i} </a>`;
      }else{
        pageLink += `<a class='pagination-link'> ${i} </a>`; 
      }
    }
    pageLink += `<a class='pagination-link'>></a>`;
    pageLink += `<a class='pagination-link'>>></a>`
    pagination.append(pageLink);
  }

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

    console.log(tabName);
    if (tabName === 'location') {
      loadLocationTable();
      createPageLink();
    } else if (tabName === 'flight') {
      loadFlightTable();
    } else if (tabName === 'customer') {
      console.log('test');
      loadUserTable();
    }
  };

  /* Thêm chuyến bay */
  btnAddFlight.on('click', showAddFlightForm);
  btnHideForm.on('click', function () {
    hideForm();
    hideDialog();
  });

  $('body').on('click', '.btn-delete', function () {
    let id = $(this).attr('id');
    console.log(id);
    let currentRow = $(this).closest('tr');
    let currentRowId = currentRow.attr('id');
    dialogID = id.slice(id.indexOf('-') + 1, id.length);
    if (dialogID.includes('flight')) {
      var idFlight = currentRow.find('td:eq(0)').html();
      $('#flightID').html(idFlight);
      showDialog('delete', 'users', currentRowId);
    } else if (dialogID.includes('location')) {
      locationName = currentRow.find('td:eq(1)').html();
      $('#locationName').html(locationName);
      showDialog('delete', 'locations', currentRowId);
    } else if (dialogID.includes('customer')) {
      var customerName = currentRow.find('td:eq(1)').html();
      $('#customerName').html(customerName);
      showDialog('delete', 'users', currentRowId);
    }
  });

  btnCloseDialog.on('click', hideDialog);

  btnAddLocation.on('click', function () {
    var id = btnAddLocation.attr('id');
    dialogID = id.slice(id.indexOf('-') + 1, id.length);
    showDialog('add', 'locations');
  });

  $('body').on('click', '.btn-edit', function () {
    var id = $(this).attr('id');
    if (id.includes('flight')) {
      showUpdateFlightForm();
    } else {
      dialogID = id.slice(id.indexOf('-') + 1, id.length);
      locationName = $(this).closest('tr').find('td:eq(1)').html();
      showDialog('update', 'locations', $(this).closest('tr').attr('id'));
    }
  });

  function showAddFlightForm() {
    formName = '#' + addFlightForm.attr('id');
    addFlightForm.css('display', 'block');
    setTimeout(function () {
      document.querySelector('#add-flight-form form').classList.add('show');
    }, 50);
  }

  function showUpdateFlightForm() {
    formName = '#' + updateFlightForm.attr('id');
    updateFlightForm.css('display', 'block');
    setTimeout(function () {
      document.querySelector('#update-flight-form form').classList.add('show');
    }, 50);
  }

  /* Ẩn form chuyến bay */
  function hideForm() {
    document.querySelector(formName + ' form').classList.remove('show');
    setTimeout(function () {
      $(formName).css('display', 'none');
    }, 300);
  }

  //Ẩn form khi click vào vùng ngoài form
  $(document).on('click', function (event) {
    var formID = formName.slice(formName.indexOf('#') + 1, formName.length);
    if (event.target.id == formID) {
      hideForm();
    }
  });

  /* Xem thông tin chi tiết chuyến bay */
  function showDialog(actionType, tableName, currentRowId, data) {
    let dialog = $(`#${dialogID}`).find('.dialog');
    let confirmButton = dialog.find('button[type="submit"]');
    if (actionType === 'delete') {
      confirmButton.on('click', async () => {
        const res = await $.ajax({
          url: `/${tableName}/${currentRowId}`,
          type: 'DELETE',
        });

        if (res.success) {
          if (tableName === 'locations') {
            loadLocationTable();
          } else if (tableName === 'users') {
            loadUserTable();
          }
          dialog.removeClass('show');
          $(`#${dialogID}`).removeClass('show');
        }
      });
    } else if (actionType === 'update') {
      if (tableName === 'locations') {
        dialog.find('input[name=value]').val(locationName);
        confirmButton.on('click', async () => {
          const res = await $.ajax({
            url: `locations/${currentRowId}`,
            type: 'PUT',
            data: {
              value: dialog.find('input[name=value]').val(),
            },
          });

          if (res.success) {
            loadLocationTable();
            dialog.removeClass('show');
            $(`#${dialogID}`).removeClass('show');
          }
        });
      }
    } else if (actionType === 'add') {
      if (tableName === 'locations') {
        confirmButton.on('click', async () => {
          const res = await $.post('/locations', {
            value: dialog.find('input[name=value]').val(),
          });
          if (res) {
            dialog.find('input[name=value]').val('');
            loadLocationTable();
            hideDialog();
          }
        });
      }
    }
    dialog.addClass('show');
    setTimeout(function () {
      dialog.focus();
    }, 6000); // focus on dialog after animation completes
    $(`#${dialogID}`).addClass('show');
  }

  function hideDialog() {
    let dialog = document.getElementById(dialogID).querySelector('.dialog');
    dialog.classList.remove('show');
    document.getElementById(dialogID).classList.remove('show');
  }

  /* Chỉnh sửa thông tin chuyến bay */

  const loadFlightTable = async () => {
    const res = await $.get('/flights');
    console.log(res);
  };

  const loadUserTable = async () => {
    const res = await $.get('/users');
    const userTable = $('#user_table');
    const userTbody = userTable.find('tbody');
    userTbody.empty();

    console.log(userTable, userTbody);

    res.forEach((user, index) => {
      console.log(user);
      userTbody.append(`<tr id=${user.id}>
        <td>${index}</td>  
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.address}</td>
        <td>${user.phone}</td>
        <td>${user.gender === true ? 'Nam' : 'Nữ'}</td>
       <td>
          <button class='btn-delete' id="btn-delete-customer"><span class='fa fa-trash'></span></button>
        </td> 
      </tr>`);
    });
  };
});
