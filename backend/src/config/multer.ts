import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "..", "uploads"),
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;

    cb(null, filename);
  },
});

export const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const isFileValid =
      path.extname(file.originalname) === ".jpg" ||
      path.extname(file.originalname) === ".png" ||
      path.extname(file.originalname) === ".jpeg" ||
      path.extname(file.originalname) === ".mp4";

    if (!isFileValid) {
      return cb(new Error("File are not allowed"));
    }

    return cb(null, true);
  },
});
