const searchFlightInput = $('#searchFlightInput');
const searchFlightButton = $('#searchFlightButton');
const flightDataTable = $('#flightDataTable');
const userTable = $('#userTable');

searchFlightButton.on('click', async () => {
  const searchFlightInputValue = searchFlightInput.val();
  const ticket = await $.get(`/tickets/${searchFlightInputValue}`);
  console.log(ticket);

  userTable.find('.text-center').eq(1).append(`
  <td>${ticket.userId}</td>
  <td>${ticket.user.username}</td>
  <td>2</td>
  <td>${ticket.type ? 'Thương gia' : 'Phổ thông'}</td>
  <td>${ticket.price}</td>
	<td class="text-pay">Đã thanh toán</td> 
  `);

  flightDataTable.append(
    `
            <tr class="row-color">
                <td colspan="4">
                    <h5>NGÀY KHỞI HÀNH: <b>${ticket.flight.startTime}</b></h5>
                </td>
            </tr>
            <tr>
                <td rowspan="2">
                    <b>${ticket.id}</b>
                    <p>THỜI GIAN BAY: 1 tiếng 30 phút</p>
                </td>
                <td class="none-border-right">
                    <h6>${ticket.flight.startLocation.value}</h6>
                </td>
                <td class="none-border-left">
                    <h6>${ticket.flight.arriveLocation.value}</h6>
                </td>
                <td rowspan="2">
                    <h6>MÁY BAY</h6>
                    <p>Máy bay Boeing 787 Dreamliner</p>
                </td>
            </tr>
            <tr>
                <td>
                    <span>GIỜ KHỞI HÀNH:</span>
                    <h6>${ticket.flight.startTime}</h6>

                    <span>CỔNG</span><br>
                    <h6>Gate 1</h6>
                </td>

                <td>
                    <span>GIỜ ĐẾN:</span>
                    <h6>${ticket.flight.arriveTime}</h6>

                    <span>CỔNG</span><br>
                    <h6>Không có thông tin</h6>
                </td>
            </tr>
  `
  );
});
