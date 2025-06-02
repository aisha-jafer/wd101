function getUserEntries() {
  return JSON.parse(localStorage.getItem("user-entries")) || [];
}

function displayEntries() {
  const entries = getUserEntries();
  const tableEntries = entries.map(entry => {
    return `<tr>
      <td>${entry.name}</td>
      <td>${entry.email}</td>
      <td>${entry.password}</td>
      <td>${entry.dob}</td>
      <td>${entry.acceptedTerms}</td>
    </tr>`;
  }).join("");

  const table = `<table border="1">
    <tr>
      <th>name</th>
      <th>email</th>
      <th>password</th>
      <th>dob</th>
      <th>accepted terms</th>
    </tr>${tableEntries}</table>`;

  document.getElementById("user-entries").innerHTML = table;
}

function isAgeValid(dob) {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age >= 18 && age <= 55;
}

const form = document.getElementById("registration-form");
form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;
  const acceptedTerms = document.getElementById("acceptTerms").checked;

  if (!isAgeValid(dob)) {
    alert("Only users between 18 and 55 years are allowed.");
    return;
  }

  const entry = { name, email, password, dob, acceptedTerms };
  const entries = getUserEntries();
  entries.push(entry);
  localStorage.setItem("user-entries", JSON.stringify(entries));

  displayEntries();
  form.reset();
});

window.addEventListener("DOMContentLoaded", () => {
  displayEntries();
});
