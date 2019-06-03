const express = require("express");
const connectDB = require("./config/db");
const routes = require("./routes");

//Initializing Express Server
const app = express();

//Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Defines all routes
app.use(routes);

//Defining port that backend its going to use
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
