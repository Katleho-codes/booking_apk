import express from "express";
import createFile from "../controllers/create_file.js";
import multer from "multer";

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, "uploads/");
  },
  filename(req, file, cb) {
    cb(null, `${Date.now()}.pdf`);
  },
});

const upload = multer({ storage });

const router = express.Router();

router.post("/file", upload.single("pdfFile"), createFile);

export { router };
