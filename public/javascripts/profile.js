$('document').ready(() => {
  const surNameInput = $('#surname');
  const nameInput = $('#name');
  const genderSelect = $('#gender');
  const domicileInput = $('#domicile');
  const phoneInput = $('#phonenumber');
  const emailInput = $('#email');
  const submitButton = $('#submitButton');
  const dateInput = $('#date');

  const userId = window.location.href.slice(
    window.location.href.lastIndexOf('/') + 1
  );

  submitButton.on('click', async () => {
    const email = emailInput.val();
    const username = surNameInput.val() + nameInput.val();
    const gender = Number.parseInt(genderSelect.val());
    const address = domicileInput.val();
    const phone = phoneInput.val();
    const birthDay = dateInput.val();
    console.log(birthDay);

    const data = { email, username, gender, address, phone, birthDay };

    const result = await $.ajax(`/users/${userId}`, { method: 'PUT', data });
    console.log(result);
  });
});
