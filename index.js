let userForm = document.getElementById("user-form");

const retrieveEntries = () => {
  let entries = localStorage.getItem("user-entries");
  if (entries) {
    entries = JSON.parse(entries);
  } else {
    entries = [];
  }
  return entries;
};
let userEntries = retrieveEntries();

const displayEntries = () => {
  const entries = retrieveEntries();
  /*
  <table>
    <tr>
        <th>Name</th>   
        <th>Email</th>
        ...
        <tr>
        <td>John Doe</td>
        <td>jhon@doe.com</td>
        ...
        </tr>
        </table>
        */

  const tableEntries = entries
    .map((entry) => {
      const nameCell = `<td class='border px-4 py-2>${entry.name}</td>`;
      const emailCell = `<td class='border px-4 py-2>${entry.email}</td>`;
      const passwordCell = `<td class='border px-4 py-2>${entry.password}</td>`;
      const dobCell = `<td class='border px-4 py-2>${entry.dob}</td>`;
      const acceptTermsCell = `<td class='border px-4 py-2>${entry.acceptedTermsAndconditions}</td>`;

      return `<tr>${nameCell}${emailCell}${passwordCell}${dobCell}${acceptTermsCell}</tr>`;
    })
    .join("\n");

  const table = `<table border="1">
  <tr>

  <th>Name</th>
  <th>Email</th>
  <th>Password</th>
  <th>dob</th>
    <th>accepted terms?</th>
    </tr>${tableEntries}</table>`;

  document.getElementById("user-entries").innerHTML = table;
};

const saveUserForm = (event) => {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const dob = document.getElementById("dob").value;

  const acceptedTermsAndconditions =
    document.getElementById("acceptTerms").checked;

  const dobDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - dobDate.getFullYear();
  const monthDiff = today.getMonth() - dobDate.getMonth();
  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dobDate.getDate())
  ) {
    age--;
  }
  if (age < 18 || age > 55) {
    alert("You must be between 18 and 55 years old to register.");
    return;
  }

  const entry = {
    name,
    email,
    password,
    dob,
    acceptedTermsAndconditions,
  };

  userEntries.push(entry);

  localStorage.setItem("user-entries", JSON.stringify(userEntries));
  displayEntries();
};
userForm.addEventListener("submit", saveUserForm);
displayEntries();
