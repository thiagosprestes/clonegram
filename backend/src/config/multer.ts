import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: path.join(__dirname, "..", "..", "uploads"),
  filename: (req, file, cb) => {
    const filename = `${Date.now()}-${file.originalname}`;

    cb(null, filename);
  },
});

export const upload = multer({ storage });
