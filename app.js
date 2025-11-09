import express from 'express';

import path from 'path';
import { fileURLToPath } from 'url';


import bookRoutes from "./routers/bookRoutes.js"
import connectDb from './config/db.js';



const app = express();



const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);


app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.set('view engine', 'ejs');

app.set('views', path.join(__dirname, 'views'));


app.use('/book', bookRoutes);



const startServer = async () => {
  try {
    const connect = await connectDb();

    if (!connect) {
      throw new Error('Failed to connect the db');
    }

    console.log(' db connected');

    const port = 3000;

    app.listen(port, () => {
      console.log(`Server running on ${port}`);
    });
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

startServer();
