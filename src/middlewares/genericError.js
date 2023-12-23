export const genericError = (err, req, res, next) => {
    res.status(err.statusCode || 500).send(err.message);
    return; // Assicurati di restituire il controllo qui
  };
  