const apiPaisBase = "/api/pais";
const apiUsuarioBase = "/api/usuario";
const paisForm = document.getElementById("paisForm");
const mensaje = document.getElementById("mensaje");
const paisList = document.getElementById("paisList");
const refreshButton = document.getElementById("refreshButton");
const submitButton = document.getElementById("submitButton");
const cancelEditButton = document.getElementById("cancelEditButton");
const paisIdInput = document.getElementById("paisId");
const formStatus = document.getElementById("formStatus");
const countryCount = document.getElementById("countryCount");
const emptyState = document.getElementById("emptyState");

const usuarioForm = document.getElementById("usuarioForm");
const usuarioFormTitle = document.getElementById("user-form-title");
const usuarioIdInput = document.getElementById("usuarioId");
const mensajeUsuario = document.getElementById("mensajeUsuario");
const usuarioList = document.getElementById("usuarioList");
const refreshUsuariosButton = document.getElementById("refreshUsuariosButton");
const cancelEditUsuarioButton = document.getElementById("cancelEditUsuarioButton");
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
      <li class="pais-item" data-id="${pais.id}" style="animation-delay: ${index * 80}ms">
        <div>
          <span>${pais.nombre}</span>
          <strong>${pais.codigo}</strong>
        </div>
        <div class="btn-group">
          <button type="button" class="btn-edit" data-id="${pais.id}">Editar</button>
          <button type="button" class="btn-delete" data-id="${pais.id}">Eliminar</button>
        </div>
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
      <li class="usuario-item" data-id="${usuario.id}" style="animation-delay: ${index * 80}ms">
        <div>
          <span>${usuario.nombre}</span>
          <strong>${usuario.correo}</strong>
        </div>
        <div class="btn-group">
          <button type="button" class="btn-edit" data-id="${usuario.id}">Editar</button>
          <button type="button" class="btn-delete" data-id="${usuario.id}">Eliminar</button>
        </div>
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
    console.log("Países cargados:", paises);
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
    console.log("Usuarios cargados:", usuarios);
    renderUsuarioList(usuarios);
    formStatusUsuario.textContent = "Listo";
    formStatusUsuario.style.background = "rgba(99, 102, 241, 0.14)";
  } catch (error) {
    renderUsuarioList([]);
    mostrarMensajeUsuario("Error al cargar usuarios.", false);
    console.error(error);
  }
};

const enterEditMode = (pais) => {
  paisIdInput.value = pais.id;
  paisForm.nombre.value = pais.nombre;
  paisForm.codigo.value = pais.codigo;
  submitButton.textContent = "Actualizar país";
  cancelEditButton.style.display = "inline-block";
  formStatus.textContent = "Editando";
  formStatus.style.background = "rgba(59, 130, 246, 0.14)";
};

const exitEditMode = () => {
  paisIdInput.value = "";
  paisForm.reset();
  submitButton.textContent = "Guardar país";
  cancelEditButton.style.display = "none";
  formStatus.textContent = "Listo";
  formStatus.style.background = "rgba(99, 102, 241, 0.14)";
};

const enterUsuarioEditMode = (usuario) => {
  console.log("Editar usuario:", usuario);
  usuarioIdInput.value = usuario.id;
  usuarioForm.nombre.value = usuario.nombre;
  usuarioForm.correo.value = usuario.correo;
  usuarioFormTitle.textContent = "Editar usuario";
  usuarioForm.querySelector('button[type="submit"]').textContent = "Actualizar usuario";
  cancelEditUsuarioButton.style.display = "inline-block";
  formStatusUsuario.textContent = "Editando";
  formStatusUsuario.style.background = "rgba(59, 130, 246, 0.14)";
};

const exitUsuarioEditMode = () => {
  usuarioIdInput.value = "";
  usuarioForm.reset();
  usuarioFormTitle.textContent = "Agregar nuevo usuario";
  usuarioForm.querySelector('button[type="submit"]').textContent = "Guardar usuario";
  cancelEditUsuarioButton.style.display = "none";
  formStatusUsuario.textContent = "Listo";
  formStatusUsuario.style.background = "rgba(99, 102, 241, 0.14)";
};

const eliminarPais = async (id) => {
  if (!confirm("¿Eliminar este país?")) return;
  try {
    const res = await fetch(`${apiPaisBase}/${id}`, { method: "DELETE" });
    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.mensaje || body.error || "Error al eliminar país.");
    }
    mostrarMensaje(body.mensaje || "País eliminado correctamente.");
    await cargarPaises();
  } catch (error) {
    mostrarMensaje(error.message, false);
    console.error(error);
  }
};

const eliminarUsuario = async (id) => {
  if (!confirm("¿Eliminar este usuario?")) return;
  try {
    const res = await fetch(`${apiUsuarioBase}/${id}`, { method: "DELETE" });
    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.mensaje || body.error || "Error al eliminar usuario.");
    }
    mostrarMensajeUsuario(body.mensaje || "Usuario eliminado correctamente.");
    await cargarUsuarios();
  } catch (error) {
    mostrarMensajeUsuario(error.message, false);
    console.error(error);
  }
};

paisForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  mensaje.textContent = "";

  const id = paisIdInput.value;
  const nombre = event.target.nombre.value.trim();
  const codigo = event.target.codigo.value.trim().toUpperCase();

  if (!nombre || codigo.length !== 2) {
    return mostrarMensaje("Debe ingresar nombre y código ISO de 2 letras.", false);
  }

  try {
    formStatus.textContent = id ? "Actualizando" : "Guardando";
    const url = id ? `${apiPaisBase}/${id}` : apiPaisBase;
    const method = id ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, codigo })
    });

    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.mensaje || body.error || "Error al guardar país.");
    }

    // Pequeño delay para asegurar que la BD sincronice
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await cargarPaises();
    if (id) {
      mostrarMensaje("País actualizado correctamente.");
      console.log(`País actualizado: ${body.data?.nombre || nombre} (ID: ${body.data?.id || id})`);
    } else {
      mostrarMensaje("País guardado correctamente.");
      console.log(`País añadido: ${body.nombre || nombre} (ID: ${body.id || 'desconocido'})`);
    }
    exitEditMode();
  } catch (error) {
    mostrarMensaje(error.message, false);
    formStatus.textContent = "Error";
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
    const id = usuarioIdInput.value;
    formStatusUsuario.textContent = id ? "Actualizando" : "Guardando";
    const url = id ? `${apiUsuarioBase}/${id}` : apiUsuarioBase;
    const method = id ? "PUT" : "POST";
    console.log("Enviar usuario:", { id, nombre, correo, method, url });

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre, correo })
    });

    const body = await res.json();
    if (!res.ok) {
      throw new Error(body.mensaje || body.error || "Error al guardar usuario.");
    }

    // Pequeño delay para asegurar que la BD sincronice
    await new Promise(resolve => setTimeout(resolve, 300));
    
    await cargarUsuarios();
    if (id) {
      mostrarMensajeUsuario("Usuario actualizado correctamente.");
    } else {
      mostrarMensajeUsuario("Usuario guardado correctamente.");
    }
    exitUsuarioEditMode();
    event.target.reset();
  } catch (error) {
    mostrarMensajeUsuario(error.message, false);
    formStatusUsuario.textContent = "Error";
    console.error(error);
  }
});

paisList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("button.btn-delete");
  if (deleteButton) {
    eliminarPais(deleteButton.dataset.id);
    return;
  }

  const editButton = event.target.closest("button.btn-edit");
  if (!editButton) return;

  const id = editButton.dataset.id;
  const nombre = editButton.closest("li").querySelector("span").textContent;
  const codigo = editButton.closest("li").querySelector("strong").textContent;

  enterEditMode({ id, nombre, codigo });
});

usuarioList.addEventListener("click", (event) => {
  const deleteButton = event.target.closest("button.btn-delete");
  if (deleteButton) {
    eliminarUsuario(deleteButton.dataset.id);
    return;
  }

  const editButton = event.target.closest("button.btn-edit");
  if (!editButton) return;

  const id = editButton.dataset.id;
  const nombre = editButton.closest("li").querySelector("span").textContent;
  const correo = editButton.closest("li").querySelector("strong").textContent;

  enterUsuarioEditMode({ id, nombre, correo });
});

cancelEditButton.addEventListener("click", exitEditMode);
cancelEditUsuarioButton.addEventListener("click", exitUsuarioEditMode);
refreshButton.addEventListener("click", cargarPaises);
refreshUsuariosButton.addEventListener("click", cargarUsuarios);
window.addEventListener("load", () => {
  cargarPaises();
  cargarUsuarios();
});
