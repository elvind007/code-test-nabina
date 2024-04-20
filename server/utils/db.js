import mysql from 'mysql'

const con = mysql.createConnection({
    host: "sql6.freesqldatabase.com",
    user: "sql6700549",
    password: "4wejWbwniP",
    database: "sql6700549"
})

con.connect(function(err) {
    if(err) {
        console.log("connection error")
    } else {
        console.log("Connected to Database")
    }
})

export default con;

