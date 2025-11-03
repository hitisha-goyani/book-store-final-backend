import multer from "multer";
import path from "path";
import fs from "fs";

const __dirname = path.resolve();


const uploadPath = path.join(__dirname, "public/uploads/");
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const uploads = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: function (req, file, cb) {
    const allowed = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowed.includes(file.mimetype)) {
      return cb(new Error("file type not valid"));
    }
    cb(null, true);
  },
});

export default uploads;
