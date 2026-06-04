const DEBUG_USER = process.env.DEBUG_USER || "erickasqw";
const DEBUG_PASSWORD = process.env.DEBUG_PASSWORD || "11092006";

const basicAuth = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Acceso a la base de datos"');
    return res.status(401).json({ error: "Autenticación requerida" });
  }

  const [scheme, encoded] = authHeader.split(" ");
  if (scheme !== "Basic" || !encoded) {
    res.setHeader("WWW-Authenticate", 'Basic realm="Acceso a la base de datos"');
    return res.status(401).json({ error: "Encabezado de autorización inválido" });
  }

  const decoded = Buffer.from(encoded, "base64").toString("utf8");
  const [user, password] = decoded.split(":");

  if (user === DEBUG_USER && password === DEBUG_PASSWORD) {
    return next();
  }

  res.setHeader("WWW-Authenticate", 'Basic realm="Acceso a la base de datos"');
  return res.status(401).json({ error: "Usuario o contraseña incorrectos" });
};

module.exports = basicAuth;
