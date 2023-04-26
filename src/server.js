import express from "express";
import configViewEngine from "./config/viewEngine";
import initWebRoutes from "./routes/web";
import connection from "./config/connectDB";
import initApiRoutes from "./routes/api";
import configCors from "./config/cors";
require("dotenv").config();
import bodyParser from "body-parser";
import jwtAction from "./middleware/JWTaction";


const app = express();
const PORT = process.env.PORT || 8080;
// config view engine
configViewEngine(app);
// config cors
configCors(app);
//body-parser use to get data from form
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


//test connection
connection();
// init all web routes
initWebRoutes(app);
initApiRoutes(app);
app.listen(PORT,(err)=>{
    console.log("Server is running on port: " + PORT);
});