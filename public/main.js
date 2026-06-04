const apiPaisBase = "/api/pais";
const apiUsuarioBase = "/api/usuario";
const paisForm = document.getElementById("paisForm");
const mensaje = document.getElementById("mensaje");
const paisList = document.getElementById("paisList");
const refreshButton = document.getElementById("refreshButton");
const formStatus = document.getElementById("formStatus");
const countryCount = document.getElementById("countryCount");
const emptyState = document.getElementById("emptyState");

const usuarioForm = document.getElementById("usuarioForm");
const mensajeUsuario = document.getElementById("mensajeUsuario");
const usuarioList = document.getElementById("usuarioList");
const refreshUsuariosButton = document.getElementById("refreshUsuariosButton");
const formStatusUsuario = document.getElementById("formStatusUsuario");
const userCount = document.getElementById("userCount");
const emptyUserState = document.getElementById("emptyUserState");

const mostrarMensaje = (texto, success = true) => {
  mensaje.textContent = texto;
  mensaje.style.color = success ? "#22c55e" : "#ef4444";
  formStatus.textContent = success ? "Correcto" : "Error";
  formStatus.style.background = success ? "rgba(34, 197, 94, 0.14)" : "rgba(239, 68, 68, 0.14)";
};

const mostrarMensajeUsuario = (texto, success = true) => {
  mensajeUsuario.textContent = texto;
  mensajeUsuario.style.color = success ? "#22c55e" : "#ef4444";
  formStatusUsuario.textContent = success ? "Correcto" : "Error";
  formStatusUsuario.style.background = success ? "rgba(34, 197, 94, 0.14)" : "rgba(239, 68, 68, 0.14)";
};

const renderPaisList = (paises) => {
  if (!paises || paises.length === 0) {
    paisList.innerHTML = "";
    emptyState.style.display = "block";
    countryCount.textContent = "0 países";
    return;
  }

  emptyState.style.display = "none";
  countryCount.textContent = `${paises.length} país${paises.length === 1 ? "" : "es"}`;

  paisList.innerHTML = paises
    .map((pais, index) => `
      <li style="animation-delay: ${index * 80}ms">
        <span>${pais.nombre}</span>
        <strong>${pais.codigo}</strong>
      </li>
    `)
    .join("");
};

const renderUsuarioList = (usuarios) => {
  if (!usuarios || usuarios.length === 0) {
    usuarioList.innerHTML = "";
    emptyUserState.style.display = "block";
    userCount.textContent = "0 usuarios";
    return;
  }

  emptyUserState.style.display = "none";
  userCount.textContent = `${usuarios.length} usuario${usuarios.length === 1 ? "" : "s"}`;

  usuarioList.innerHTML = usuarios
    .map((usuario, index) => `
      <li style="animation-delay: ${index * 80}ms">
        <span>${usuario.nombre}</span>
        <strong>${usuario.correo}</strong>
      </li>
    `)
    .join("");
};

const cargarPaises = async () => {
  try {
    formStatus.textContent = "Cargando";
    const res = await fetch(apiPaisBase);
    if (!res.ok) throw new Error("No se pudo cargar la lista de países.");
    const paises = await res.json();
    renderPaisList(paises);
    formStatus.textContent = "Listo";
    formStatus.style.background = "rgba(99, 102, 241, 0.14)";
  } catch (error) {
    renderPaisList([]);
    mostrarMensaje("Error al cargar países.", false);
    console.error(error);
  }
};

const cargarUsuarios = async () => {
  try {
    formStatusUsuario.textContent = "Cargando";
    const res = await fetch(apiUsuarioBase);
    if (!res.ok) throw new Error("No se pudo cargar la lista de usuarios.");
    const usuarios = await res.json();
    renderUsuarioList(usuarios);
    formStatusUsuario.textContent = "Listo";
    formStatusUsuario.style.background = "rgba(99, 102, 241, 0.14)";
  } catch (error) {
    renderUsuarioList([]);
    mostrarMensajeUsuario("Error al cargar usuarios.", false);
    console.error(error);
  }
};

paisForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  mensaje.textContent = "";

  const nombre = event.target.nombre.value.trim();
  const codigo = event.target.codigo.value.trim().toUpperCase();

  if (!nombre || codigo.length !== 2) {
    return mostrarMensaje("Debe ingresar nombre y código ISO de 2 letras.", false);
  }

  try {
    formStatus.textContent = "Guardando";
    const res = await fetch(apiPaisBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, codigo })
    });

    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.mensaje || body.error || "Error al guardar país.");
    }

    await cargarPaises();
    mostrarMensaje("País guardado correctamente.");
    event.target.reset();
  } catch (error) {
    mostrarMensaje(error.message, false);
    console.error(error);
  }
});

usuarioForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  mensajeUsuario.textContent = "";

  const nombre = event.target.nombre.value.trim();
  const correo = event.target.correo.value.trim();

  if (!nombre || !correo || !correo.includes("@")) {
    return mostrarMensajeUsuario("Debe ingresar nombre y correo válido.", false);
  }

  try {
    formStatusUsuario.textContent = "Guardando";
    const res = await fetch(apiUsuarioBase, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo })
    });

    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.mensaje || body.error || "Error al guardar usuario.");
    }

    await cargarUsuarios();
    mostrarMensajeUsuario("Usuario guardado correctamente.");
    event.target.reset();
  } catch (error) {
    mostrarMensajeUsuario(error.message, false);
    console.error(error);
  }
});

refreshButton.addEventListener("click", cargarPaises);
refreshUsuariosButton.addEventListener("click", cargarUsuarios);
window.addEventListener("load", () => {
  cargarPaises();
  cargarUsuarios();
});
