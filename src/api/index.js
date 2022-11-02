require("dotenv").config();
const express = require("express");
const path = require("path");

// Establishes connection to the database on server start
// const db = require("./db");

const app = express();
app.use(express.json());



app.listen(process.env.PORT);
console.log(`Listening at http://localhost:${process.env.PORT}`);
