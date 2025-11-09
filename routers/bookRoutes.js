import express from "express";
import {
  addBook,
  getBookById,
  updateBook,
  deleteBook,
  getAllBooks,
} from "../controllers/bookController.js";


import uploads from "../middlewares/uploadMiddleware.js";

const router = express.Router();

router.get("/", getAllBooks); 
router.get("/add", (req, res) => {
  res.render("add"); // Create views/add.ejs file
});         // /book
router.post("/add", uploads.single("coverImage"), addBook);  // POST /book/add
router.get("/edit/:id", getBookById);   // /book/edit/:id
router.post("/edit/:id", uploads.single("coverImage"), updateBook); // POST /book/edit/:id
router.post("/delete/:id", deleteBook); // POST /book/delete/:id

export default router;
