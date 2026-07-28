function handleSignup() {
  const isAdmin = document.getElementById("signup-admin").checked;
  const name = document.getElementById("signup-name").value.trim();
  const studentId = document.getElementById("signup-id").value.trim();
  const email = document.getElementById("signup-email").value.trim();
  const password = document.getElementById("signup-password").value;
  const confirm = document.getElementById("signup-confirm").value;
  const errorBox = document.getElementById("signup-error");

  errorBox.style.display = "none";

  if (!name || !studentId || !email || !password || !confirm) {
    errorBox.textContent = "Please fill in all required fields.";
    errorBox.style.display = "block";
    return;
  }

  if (password !== confirm) {
    errorBox.textContent = "Passwords do not match.";
    errorBox.style.display = "block";
    return;
  }

  if (password.length < 6) {
    errorBox.textContent = "Password must be at least 6 characters.";
    errorBox.style.display = "block";
    return;
  }

  fetch("https://resolv-backend-2mka.onrender.com/api/auth/signup", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, studentId, email, password, role: isAdmin ? 'admin' : 'student' }),
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (!ok || !data.success) {
        throw new Error(data.error || "Signup failed.");
      }
      showToast("Account created! Please log in.");
      setTimeout(() => goTo("login"), 700);
    })
    .catch((err) => {
      errorBox.textContent = err.message || "Signup failed. That email may already be registered.";
      errorBox.style.display = "block";
    });
}