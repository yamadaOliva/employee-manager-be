import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();
import bodyParser from "body-parser";


const app = express();
const PORT = process.env.PORT || 8080;
// config view engine
configViewEngine(app);

//body-parser use to get data from form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// init all web routes
initWebRoutes(app);


app.listen(PORT,(err)=>{
    console.log("Server is running on port: " + PORT);
});