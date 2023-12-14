import express from "express";
import mysql from "mysql"

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password: "",
    database: "philevent"
})

app.listen(8080, ()=>{
    console.log("test")
})