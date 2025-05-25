document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("registrationForm");
  const tableBody = document.getElementById("tableBody");
  const emailInput = document.getElementById("email");
  const dobInput = document.getElementById("dob");
  const emailError = document.getElementById("emailError");
  const ageError = document.getElementById("ageError");

  // Load saved data from localStorage
  loadSavedData();

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    // Reset error messages
    emailError.textContent = "";
    ageError.textContent = "";

    // Validate email
    if (!validateEmail(emailInput.value)) {
      emailError.textContent = "Please enter a valid email address";
      return;
    }

    // Validate age (18-55 years)
    const dob = new Date(dobInput.value);
    const age = calculateAge(dob);

    if (age < 18 || age > 55) {
      ageError.textContent = "You must be between 18 and 55 years old";
      return;
    }

    // Get form values
    const name = document.getElementById("name").value;
    const email = emailInput.value;
    const password = document.getElementById("password").value;
    const dobFormatted = dobInput.value;
    const acceptedTerms = document.getElementById("acceptTerms").checked;

    // Create new table row
    const newRow = document.createElement("tr");
    newRow.innerHTML = `
          <td>${name}</td>
          <td>${email}</td>
          <td>${password}</td>
          <td>${dobFormatted}</td>
          <td>${acceptedTerms}</td>
      `;

    // Add to table
    tableBody.appendChild(newRow);

    // Save to localStorage
    saveToLocalStorage({
      name,
      email,
      password,
      dob: dobFormatted,
      acceptedTerms,
    });

    // Reset form
    form.reset();
  });

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  function calculateAge(birthDate) {
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    return age;
  }

  function saveToLocalStorage(userData) {
    let users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    users.push(userData);
    localStorage.setItem("registeredUsers", JSON.stringify(users));
  }

  function loadSavedData() {
    const users = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    users.forEach((user) => {
      const newRow = document.createElement("tr");
      newRow.innerHTML = `
              <td>${user.name}</td>
              <td>${user.email}</td>
              <td>${user.password}</td>
              <td>${user.dob}</td>
              <td>${user.acceptedTerms}</td>
          `;
      tableBody.appendChild(newRow);
    });
  }
});
