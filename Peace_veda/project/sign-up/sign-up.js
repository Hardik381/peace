  const loginForm = document.getElementById("login-form");
  const signupForm = document.getElementById("signup-form");
  const formTitle = document.getElementById("form-title");
  const toggleBtn = document.getElementById("toggle-btn");
  const toggleMsg = document.getElementById("toggle-msg");
  const formBox = document.querySelector(".form-box");

  // Function to switch forms
  function switchForm(showForm, hideForm, title, msg, btnText) {
    hideForm.classList.remove("active");
    showForm.classList.add("active");
    formTitle.textContent = title;
    toggleMsg.textContent = msg;
    toggleBtn.textContent = btnText;

    // Smooth container height resize
    formBox.style.height = showForm.offsetHeight + 120 + "px";
  }

  // Initial container height
  window.addEventListener("load", () => {
    formBox.style.height = loginForm.offsetHeight + 120 + "px";
  });

  toggleBtn.addEventListener("click", () => {
    if (loginForm.classList.contains("active")) {
      switchForm(signupForm, loginForm, "Sign Up", "Already have an account?", "Login");
    } else {
      switchForm(loginForm, signupForm, "Login", "Don’t have an account?", "Sign Up");
    }
  });
