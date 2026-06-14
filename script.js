 const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const forgotForm = document.getElementById("forgotForm");
const loginBtn = document.getElementById("loginBtn");

function showRegister() {
  loginForm.classList.remove("active");
  forgotForm.classList.remove("active");
  registerForm.classList.add("active");
}

function showLogin() {
  registerForm.classList.remove("active");
  forgotForm.classList.remove("active");
  loginForm.classList.add("active");
}

function showForgot() {
  loginForm.classList.remove("active");
  registerForm.classList.remove("active");
  forgotForm.classList.add("active");
}

const forgotLink = document.getElementById("forgotLink");

if (forgotLink) {
  forgotLink.addEventListener("click", function (event) {
    event.preventDefault();

    const email = prompt("Enter your email address:");

    if (email) {
      const message = document.getElementById("message");
      if (message) {
        message.style.display = "block";
        message.textContent = "Password reset link sent to " + email;
      }
    }
  });
}
const forgotBtn = document.getElementById("forgotBtn");

if (forgotBtn) {
  forgotBtn.addEventListener("click", () => {

    const email = document.querySelector("#forgotForm input[type='email']").value;

    if (!email) {
      alert("Please enter your email");
      return;
    }

    // check if user exists
    const users = JSON.parse(localStorage.getItem("users")) || [];

    const userExists = users.find(u => u.email === email);

    if (userExists) {
      alert("Password reset link sent to " + email);
    } else {
      alert("No account found with this email");
    }

  });
}
// Local Storage

const currentUser = localStorage.getItem("currentUser");

let tasks =
JSON.parse(
localStorage.getItem("tasks_" + currentUser)
) || [];

window.addEventListener("DOMContentLoaded", () => {

  const savedTheme =
    localStorage.getItem("theme") || "dark";

  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }

  const savedFontSize =
    localStorage.getItem("fontSize") || "Medium";

  document.body.classList.remove(
    "small-font",
    "medium-font",
    "large-font"
  );

  if (savedFontSize === "Small") {
    document.body.classList.add("small-font");
  }
  else if (savedFontSize === "Large") {
    document.body.classList.add("large-font");
  }
  else {
    document.body.classList.add("medium-font");
  }

});

let users = JSON.parse(localStorage.getItem("users")) || [];

const registerBtn = document.getElementById("registerBtn");

registerBtn.addEventListener("click", () => {

    const name = document.getElementById("fullName").value;
    const email = document.getElementById("registerEmail").value;
    const password = document.getElementById("registerPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (!name || !email || !password) {
        alert("Please fill all fields");
        return;
    }

    if (password !== confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.find(u => u.email === email);

    if (exists) {
        alert("User already exists");
        return;
    }

    users.push({ name, email, password });

    localStorage.setItem("users", JSON.stringify(users));

    alert("Account created successfully!");
    showLogin();
});


loginBtn.addEventListener("click", () => {

    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];

    const user = users.find(
        u => u.email === email && u.password === password
    );

    if (user) {
        localStorage.setItem("currentUser", email);
        window.location.href = "home.html";
    } else {
        alert("Invalid email or password");
    }
});

