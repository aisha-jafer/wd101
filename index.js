// Load existing entries from localStorage on page load
document.addEventListener("DOMContentLoaded", function () {
  loadEntries();
});

// Form submission handler
document
  .getElementById("registrationForm")
  .addEventListener("submit", function (e) {
    e.preventDefault();

    // Clear previous errors
    clearErrors();

    // Get form data
    const formData = {
      name: document.getElementById("name").value.trim(),
      email: document.getElementById("email").value.trim(),
      password: document.getElementById("password").value,
      dob: document.getElementById("dob").value,
      terms: document.getElementById("terms").checked,
    };

    // Validate form
    if (validateForm(formData)) {
      saveEntry(formData);
      loadEntries(); // Load entries immediately after saving
      displaySuccess("Registration successful!");
      document.getElementById("registrationForm").reset();
    }
  });

function validateForm(data) {
  let isValid = true;

  // Name validation
  if (!data.name || data.name.length < 2) {
    showError("nameError", "Name must be at least 2 characters long");
    isValid = false;
  }

  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!data.email || !emailPattern.test(data.email)) {
    showError("emailError", "Please enter a valid email address");
    isValid = false;
  }

  // Password validation
  if (!data.password || data.password.length < 6) {
    showError("passwordError", "Password must be at least 6 characters long");
    isValid = false;
  }

  // Date of birth validation (18-55 years)
  if (!data.dob) {
    showError("dobError", "Date of birth is required");
    isValid = false;
  } else {
    const today = new Date();
    const birthDate = new Date(data.dob);

    // Calculate age more precisely
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }

    if (age < 18) {
      showError("dobError", "You must be at least 18 years old to register");
      isValid = false;
    } else if (age > 55) {
      showError(
        "dobError",
        "Registration is only available for people up to 55 years old"
      );
      isValid = false;
    }
  }

  // Terms validation
  if (!data.terms) {
    showError("termsError", "You must accept the terms and conditions");
    isValid = false;
  }

  return isValid;
}

function showError(elementId, message) {
  document.getElementById(elementId).textContent = message;
}

function clearErrors() {
  const errorElements = document.querySelectorAll(".error");
  errorElements.forEach((element) => (element.textContent = ""));
  document.getElementById("successMessage").textContent = "";
}

function displaySuccess(message) {
  document.getElementById("successMessage").textContent = message;
}

function saveEntry(data) {
  // Get existing entries from localStorage
  let entries = JSON.parse(localStorage.getItem("registrationEntries")) || [];

  // Add new entry
  entries.push({
    name: data.name,
    email: data.email,
    password: data.password,
    dob: data.dob,
    acceptedTerms: data.terms,
  });

  // Save back to localStorage
  localStorage.setItem("registrationEntries", JSON.stringify(entries));
}

function loadEntries() {
  // Get entries from localStorage
  const entries = JSON.parse(localStorage.getItem("registrationEntries")) || [];

  // Get table body
  const tableBody = document.getElementById("entriesTableBody");
  tableBody.innerHTML = "";

  // Populate table
  entries.forEach((entry) => {
    const row = tableBody.insertRow();
    row.insertCell(0).textContent = entry.name;
    row.insertCell(1).textContent = entry.email;
    row.insertCell(2).textContent = entry.password;
    row.insertCell(3).textContent = entry.dob;
    row.insertCell(4).textContent = entry.acceptedTerms ? "true" : "false";
  });
}
