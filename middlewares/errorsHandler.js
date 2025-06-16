function errorsHandler(err, req, res, next) {
  console.error(err);
  res.status(500).json({ error: "Errore interno del server" });
}

module.exports = errorsHandler;
