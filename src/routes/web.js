import  express  from "express";
import  homeController  from "../controller/homeController";
const router = express.Router();
/**
 * 
 * @param {*} app 
 */
const initWebRoutes = (app) => {
    router.get("/", homeController.helloAction);
    router.get("/about",(req, res) => {
        return res.send("about");
    });
    return app.use("/", router);
}


export default initWebRoutes;