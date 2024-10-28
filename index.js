require('dotenv').config();
const express = require('express');
const app = express();
const cors = require('cors');
const connection = require("./datab");
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth')


//database connection
connection();

//middlewares
app.use(express.json())
app.use(cors())

//routes
app.use("/authdb/users",userRoutes);
app.use("/authdb/auth",authRoutes);

const port = process.env.PORT||8080;
app.listen(port, ()=> console.log(`Listening on port ${port}...`)) 