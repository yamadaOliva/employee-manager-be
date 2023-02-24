import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";

const app = express();

// config view engine
configViewEngine(app);

// init all web routes
initWebRoutes(app);

const PORT = 8080;
app.listen(PORT,(err)=>{
    console.log("Server is running on port: " + PORT);
});