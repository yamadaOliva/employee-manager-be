import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connection from "./config/connectDB";
require("dotenv").config();
import bodyParser from "body-parser";


const app = express();
const PORT = process.env.PORT || 8080;
// config view engine
configViewEngine(app);

//body-parser use to get data from form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//test connection
connection();
// init all web routes
initWebRoutes(app);


app.listen(PORT,(err)=>{
    console.log("Server is running on port: " + PORT);
});