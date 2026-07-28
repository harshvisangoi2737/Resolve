function handleLogin() {
  const email = document.getElementById("login-id").value.trim();
  const password = document.getElementById("login-password").value;
  const errorBox = document.getElementById("login-error");

  errorBox.style.display = "none";

  if (!email || !password) {
    errorBox.textContent = "Please fill in both fields.";
    errorBox.style.display = "block";
    return;
  }

  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (!ok || !data.success) {
        throw new Error(data.error || "Invalid credentials.");
      }
      localStorage.setItem("resolv_token", data.token);
      localStorage.setItem("resolv_role", data.user.role);
      localStorage.setItem("resolv_name", data.user.name);
      showToast("Logged in successfully!");
      setTimeout(() => goTo("dashboard"), 600);
    })
    .catch((err) => {
      errorBox.textContent = err.message || "Login failed. Please try again.";
      errorBox.style.display = "block";
    });
}

function handleAdminLogin() {
  const email = document.getElementById("login-id").value.trim();
  const password = document.getElementById("login-password").value;
  const errorBox = document.getElementById("login-error");

  errorBox.style.display = "none";

  if (!email || !password) {
    errorBox.textContent = "Please fill in both fields.";
    errorBox.style.display = "block";
    return;
  }

  fetch("/api/auth/admin-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, status: res.status, data })))
    .then(({ ok, status, data }) => {
      if (status === 403 && data.notAdmin) {
        goTo("not-admin");
        return;
      }
      if (!ok || !data.success) {
        throw new Error(data.error || "Invalid credentials.");
      }
      localStorage.setItem("resolv_token", data.token);
      localStorage.setItem("resolv_role", data.user.role);
      localStorage.setItem("resolv_name", data.user.name);
      showToast("Admin login successful!");
      setTimeout(() => goTo("admin"), 600);
    })
    .catch((err) => {
      errorBox.textContent = err.message || "Login failed. Please try again.";
      errorBox.style.display = "block";
    });
}function handleLogin() {
  const email = document.getElementById("login-id").value.trim();
  const password = document.getElementById("login-password").value;
  const errorBox = document.getElementById("login-error");

  errorBox.style.display = "none";

  if (!email || !password) {
    errorBox.textContent = "Please fill in both fields.";
    errorBox.style.display = "block";
    return;
  }

  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (!ok || !data.success) {
        throw new Error(data.error || "Invalid credentials.");
      }
      localStorage.setItem("resolv_token", data.token);
      localStorage.setItem("resolv_role", data.user.role);
      localStorage.setItem("resolv_name", data.user.name);
      showToast("Logged in successfully!");
      setTimeout(() => goTo("dashboard"), 600);
    })
    .catch((err) => {
      errorBox.textContent = err.message || "Login failed. Please try again.";
      errorBox.style.display = "block";
    });
}

function handleAdminLogin() {
  const email = document.getElementById("login-id").value.trim();
  const password = document.getElementById("login-password").value;
  const errorBox = document.getElementById("login-error");

  errorBox.style.display = "none";

  if (!email || !password) {
    errorBox.textContent = "Please fill in both fields.";
    errorBox.style.display = "block";
    return;
  }

  fetch("/api/auth/admin-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, status: res.status, data })))
    .then(({ ok, status, data }) => {
      if (status === 403 && data.notAdmin) {
        goTo("not-admin");
        return;
      }
      if (!ok || !data.success) {
        throw new Error(data.error || "Invalid credentials.");
      }
      localStorage.setItem("resolv_token", data.token);
      localStorage.setItem("resolv_role", data.user.role);
      localStorage.setItem("resolv_name", data.user.name);
      showToast("Admin login successful!");
      setTimeout(() => goTo("admin"), 600);
    })
    .catch((err) => {
      errorBox.textContent = err.message || "Login failed. Please try again.";
      errorBox.style.display = "block";
    });
}function handleLogin() {
  const email = document.getElementById("login-id").value.trim();
  const password = document.getElementById("login-password").value;
  const errorBox = document.getElementById("login-error");

  errorBox.style.display = "none";

  if (!email || !password) {
    errorBox.textContent = "Please fill in both fields.";
    errorBox.style.display = "block";
    return;
  }

  fetch("/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, data })))
    .then(({ ok, data }) => {
      if (!ok || !data.success) {
        throw new Error(data.error || "Invalid credentials.");
      }
      localStorage.setItem("resolv_token", data.token);
      localStorage.setItem("resolv_role", data.user.role);
      localStorage.setItem("resolv_name", data.user.name);
      showToast("Logged in successfully!");
      setTimeout(() => goTo("dashboard"), 600);
    })
    .catch((err) => {
      errorBox.textContent = err.message || "Login failed. Please try again.";
      errorBox.style.display = "block";
    });
}

function handleAdminLogin() {
  const email = document.getElementById("login-id").value.trim();
  const password = document.getElementById("login-password").value;
  const errorBox = document.getElementById("login-error");

  errorBox.style.display = "none";

  if (!email || !password) {
    errorBox.textContent = "Please fill in both fields.";
    errorBox.style.display = "block";
    return;
  }

  fetch("/api/auth/admin-login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json().then((data) => ({ ok: res.ok, status: res.status, data })))
    .then(({ ok, status, data }) => {
      if (status === 403 && data.notAdmin) {
        goTo("not-admin");
        return;
      }
      if (!ok || !data.success) {
        throw new Error(data.error || "Invalid credentials.");
      }
      localStorage.setItem("resolv_token", data.token);
      localStorage.setItem("resolv_role", data.user.role);
      localStorage.setItem("resolv_name", data.user.name);
      showToast("Admin login successful!");
      setTimeout(() => goTo("admin"), 600);
    })
    .catch((err) => {
      errorBox.textContent = err.message || "Login failed. Please try again.";
      errorBox.style.display = "block";
    });
}