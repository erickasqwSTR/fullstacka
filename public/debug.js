const debugForm = document.getElementById("debugForm");
const debugMessage = document.getElementById("debugMessage");
const debugStatus = document.getElementById("debugStatus");
const debugResult = document.getElementById("debugResult");
const debugTotals = document.getElementById("debugTotals");
const debugOutput = document.getElementById("debugOutput");

const mostrarDebugMensaje = (texto, success = true) => {
  debugMessage.textContent = texto;
  debugMessage.style.color = success ? "#22c55e" : "#ef4444";
  debugStatus.textContent = success ? "Correcto" : "Error";
  debugStatus.style.background = success ? "rgba(34, 197, 94, 0.14)" : "rgba(239, 68, 68, 0.14)";
};

const fetchDebugData = async (usuario, contrasena) => {
  const authHeader = `Basic ${btoa(`${usuario}:${contrasena}`)}`;
  const res = await fetch("/api/debug", {
    headers: {
      Authorization: authHeader,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || body.mensaje || "No autorizado");
  }

  return res.json();
};

const renderDebugData = (data) => {
  debugResult.style.display = "block";
  debugTotals.textContent = `Paises: ${data.totals.paises} · Usuarios: ${data.totals.usuarios}`;
  debugOutput.textContent = JSON.stringify(data, null, 2);
};

debugForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  debugMessage.textContent = "";
  debugResult.style.display = "none";

  const usuario = event.target.usuario.value.trim();
  const contrasena = event.target.contrasena.value.trim();

  if (!usuario || !contrasena) {
    return mostrarDebugMensaje("Completa usuario y contraseña.", false);
  }

  try {
    debugStatus.textContent = "Cargando";
    debugStatus.style.background = "rgba(99, 102, 241, 0.14)";
    const data = await fetchDebugData(usuario, contrasena);
    renderDebugData(data);
    mostrarDebugMensaje("Acceso concedido.");
  } catch (error) {
    mostrarDebugMensaje(error.message, false);
  }
});
