const express = require("express");
const cors = require("cors");
const mysql = require('mysql2');
const { json } = require("express");

const app = express();
const port = 3306;

app.use(json({ limit: '50mb' }));
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'operationarclight'
});

app.get("/", cors(), (req, res) => {
    res.send("Get Request!");
});

app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
});