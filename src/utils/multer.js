const multer = require("multer");

/**
 * Función que consigura dónde se guardarán los archivos subidos por el usuario.
 * Guarda los archivos en la carpeta uploads
 * La función callback guarda el archivo con el nombre original
 */
const storage = multer.diskStorage({
  destination: "src/public/uploads/",
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

module.exports = upload;
