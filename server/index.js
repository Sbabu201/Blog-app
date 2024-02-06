const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv");
const mongoConnect = require("./db");

//env configure
dotenv.config();

//router object
const userRoutes = require('./routes/userroutes');
const blogRoutes = require("./routes/blogRoutes");
// mongodbconnection
mongoConnect();

//object declaration
const app = express();

//middlewares
app.use(cors());
app.use(express.json());

//routes
app.use("/user", userRoutes);
app.use("/blog", blogRoutes);
// port/
const PORT = process.env.PORT || 8080

//listen
app.listen(PORT, () => {
    console.log(`backend started at ${PORT}`)
})