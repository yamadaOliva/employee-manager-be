import  express  from "express";
import  homeController  from "../controller/homeController";
import  userController  from "../controller/userController";
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
    router.get("/user", userController.testUser)
    router.post("/users/create-user",userController.handleCreateNewUser);
    router.get("/users/delete/:id", userController.handleDeleteUser);
    router.get("/users/edit/:id", userController.handleUpdateUser);
    router.post("/users/update/:id", userController.handleUpdateUser1);
    return app.use("/", router);
}


export default initWebRoutes;