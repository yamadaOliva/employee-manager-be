import  express  from "express";
import  homeController  from "../controller/homeController";
import  userController  from "../controller/userController";
import apiTestController from "../controller/apiTestController";
import groupController from "../controller/groupController";
const router = express.Router();
import {checkUser,checkPermission} from "../middleware/JWTaction";
/**
 * 
 * @param {*} app 
 */
const checkUerLogin = (req,res,next)=>{
    const nonCheck = ["/","/login","/register"];
    if(nonCheck.includes(req.path)){
        return next();
    }
    next();
}
const initApiRoutes = (app) => {
   //router.all("*",checkUser,checkPermission);

    router.get("/test", apiTestController.apiTest);
    router.post("/register", apiTestController.registerHandle);
    router.post("/login", apiTestController.loginHandle);
    router.post("/logout", apiTestController.logout);
    router.get("/account",checkUser,apiTestController.getAccount)

    router.get("/users/read",apiTestController.read);
    router.post("/users/create", apiTestController.create);
    router.put("/users/update", apiTestController.update);
    router.delete("/users/delete",checkUser,checkPermission,apiTestController._delete);
    
    router.get("/groups/read", groupController.read);
    return app.use("/api/v1", router);
}


export default initApiRoutes;