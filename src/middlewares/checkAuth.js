export const checkAuth = (req, res, next) => {
    if (req.headers.authorization === "ale") {
      next();
    } else {
      const error = new Error("Unauthorized"); // Modificato il messaggio di errore
      error.statusCode = 401;
      next(error);
    }
  };
  