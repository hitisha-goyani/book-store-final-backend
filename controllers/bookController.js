import HttpError from "../middlewares/errorHandler.js";
import Book from "../modals/bookModel.js";




  const getAllBooks = async (req, res, next) => {
  try {
    const books = await Book.find();

    if (!books) {
      return next(new HttpError("Book not found", 404));
    }

    res.render("book", { books, editBook: null });

  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};



// Add a new book
const addBook = async (req, res, next) => {
  try {
    const {title,author,description,price, } = req.body;
    const coverImage = req.file ? req.file.filename : null;

    const newBook = new Book({
      title,
      author,
      description,
       price,
      coverImage,
    });

    await newBook.save();
    res.redirect("/book");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Get book by id (for editing)
const getBookById = async (req, res, next) => {
  try {
    const book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.render("edit", { book });
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Update book
const updateBook = async (req, res, next) => {
  try {
    const { title,author,description,price, } = req.body;
    const updateData = {title,author,description,price, };

    if (req.file) {
      updateData.coverImage = req.file.filename;
    }

    await Book.findByIdAndUpdate(req.params.id, updateData);
    res.redirect("/book");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

// Delete book
const deleteBook = async (req, res, next) => {
  try {
    await Book.findByIdAndDelete(req.params.id);

    res.redirect("/book");
  } catch (error) {
    next(new HttpError(error.message, 500));
  }
};

export { getAllBooks, addBook, getBookById, updateBook, deleteBook };
