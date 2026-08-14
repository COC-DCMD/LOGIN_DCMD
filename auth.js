// ===============================
// CONFIGURAÇÃO DA API
// ===============================

const API = "https://coc-dcdm-add.cocenergisa.workers.dev";

function apiUrl(path) {
  return `${API.replace(/\/+$/, "")}/${String(path).replace(/^\/+/, "")}`;
}

function getToken() {
  return localStorage.getItem("token");
}

function setSession(data) {
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
}

function getUser() {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
}

function isLogged() {
  return !!getToken();
}

function logout() {
  localStorage.clear();

  window.location.href =
    "https://coc-dcmd.github.io/LOGIN_DCMD";
}

async function authFetch(path, options = {}) {

  const token = getToken();

  const headers = {
    ...(options.headers || {}),
    Authorization: `Bearer ${token}`
  };

  const url = path.startsWith("http")
    ? path
    : apiUrl(path);

  const resp = await fetch(url, {
    ...options,
    headers
  });

  if (resp.status === 401) {

    alert("Sessão expirada. Faça login novamente.");

    logout();

    return resp;
  }

  if (resp.status === 403) {

    alert("🚫 USUÁRIO NÃO AUTORIZADO");

    window.location.href =
      "https://coc-dcmd.github.io/ADD_DCMD";

    return resp;
  }

  return resp;
}
