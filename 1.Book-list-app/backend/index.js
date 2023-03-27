import express from "express";
import mysql from "mysql";
// cors
import cors from "cors";

const app = express();
const port = 5000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "sandy@SAN13803",
  database: "test_nodesql",
});

// * Middle wares
app.use(express.json());
// CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
app.use(cors());

//! If there is an authentication problem use this
//~ ALTER USER 'root' @ 'localhost' IDENTIFIED WITH my_sql_native_password BY 'sandy@SAN13803';

app.get("/", (req, res) => {
  res.json("Hello World"); //json converts in JSON formate
});

app.get("/first", (req, res) => {
  const q = "SELECT * FROM books;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// ********************************************************
// ********************************************************
// ~* ------------------>CRUD OPERARIONS<------------------
// ********************************************************
// ********************************************************

// ? GET METHOD
app.get("/books", (req, res) => {
  const q = "SELECT * FROM books;";
  db.query(q, (err, data) => {
    if (err) return res.json(err);
    return res.json(data);
  });
});

// ? POST method

app.post("/books", (req, res) => {
  const q = "INSERT INTO books(`title`,`price`,`desc`,`cover`) VALUES (?)";

  //   we are passing hard code values in here
  // But in general we use body in request to grab the data and post it to Mysql
  // ? For testing purposes we use "POSTMAN API"
  // * collection -> method : POST , urlEndPoint : localhost:5000/books
  //   const values = [
  //     "title from backend",
  //     100,
  //     "desc from backend",
  //     "cover from backend",
  //   ];

  // ! To get data from client we use postman body(tab in postman) for testing (change format to JSON (present in end of body tab))
  // Below is how we access data from client
  const { title, price, desc, cover } = req.body; //accessing body items
  const values = [title, price, desc, cover];

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been created Successfully");
  });
});
// ? Delete
app.delete("/book/:id", (req, res) => {
  const { id } = req.params;

  const q = "DELETE from books WHERE id = ?";
  db.query(q, [id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been Deleted Successfully");
  });
});

// ? PUT method
app.put("/book/:id", (req, res) => {
  const { id } = req.params;
  const q =
    "UPDATE books SET `title`=? , `price`=? ,`desc`=?, `cover`=? WHERE id = ? ;";
  const { title, price, desc, cover } = req.body; //accessing body items
  const values = [title, price, desc, cover];
  db.query(q, [...values, id], (err, data) => {
    if (err) return res.json(err);
    return res.json("Book has been Updated Successfully");
  });
});

app.listen(port, () => {
  console.log("http://localhost:" + port);
});
