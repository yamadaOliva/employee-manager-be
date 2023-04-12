import  express  from "express";
import  homeController  from "../controller/homeController";
import  userController  from "../controller/userController";
import apiTestController from "../controller/apiTestController";
const router = express.Router();
/**
 * 
 * @param {*} app 
 */
const initApiRoutes = (app) => {
    router.get("/test", apiTestController.apiTest);
    router.post("/register", apiTestController.registerHandle);
    return app.use("/api/v1", router);
}


export default initApiRoutes;