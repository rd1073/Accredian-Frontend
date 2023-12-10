const mysql = require("mysql2");

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    password: "Golobull123#",
    database: "Auth"
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error("Error connecting to the database:", err);
        return;
    }
    console.log("Connected to the database!");
});

// Handle database connection errors
db.on("error", (err) => {
    console.error("Database connection error:", err);
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
        console.log("Reconnecting to the database...");
        db.connect();
    } else {
        throw err;
    }
});

module.exports = db;
