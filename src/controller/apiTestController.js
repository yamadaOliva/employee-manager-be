import authServices from '../services/authService.js';
import userApiService from"../services/userApiService.js"
const apiTest = (req, res) => {
    return res.status(200).json({
        message: "API is working",
    });
}
const registerHandle = async (req, res) => {
    try{
        if(req.body.email && req.body.password && req.body.name && req.body.phone){
            return res.status(407).json({
                EM : "Missing parameter",
                EC : -1,
                DT :""
            });
        }else{
            const code = await authServices.registerService(req.body);
            return res.status(200).json(code);
        }
        
    }catch(err){
        console.log(err);
    }
}

const loginHandle = async (req, res) => {
    try{
       
       let reponse = await  authServices.loginService(req.body);
        res.cookie("token",reponse.DT.access_token,{httpOnly:true,maxAge:1000*60*60});
       console.log("res=>>>",reponse);
       return res.status(200).json(reponse);
    }catch(err){
        console.log(err);
    }
}

const read = async (req, res) => {
    let data2 = await userApiService.getUserByPage(+req.query.page,+req.query.limit);
    return res.status(200).json({
       data2
    });
}

const create = async(req, res) => {
    try{
        let data =  await userApiService.createNewUser(req.body);
        return res.status(200).json(data);
    }catch(err){
        console.log(err);
        return res.status(500).json({
            EM : "something wrong",
            EC : -5,
            DT : ""
        })
    }
}

const update = async(req, res) => {
    try{
    let data = await userApiService.updateUser(req.body);
    return res.status(200).json({
       data
    });
    }catch(err){
        console.log(err);
    }
    
}

const _delete = (req, res) => {
    try{
        userApiService.deleteUser(req.body.id);
        return res.status(200).json({
            EM : "Success",
            EC : 200,
            DT : ""
        });
    }catch(err){
        console.log(err);
        return res.status(500).json({
            EM : "something wrong",
            EC : -5,
            DT : ""
        })
    }
    
    
}
const getAccount = async (req, res) => {
    console.log("req.user",req.user);
    return res.status(200).json({
        EM : "Success",
        EC : 200,
        DT : {
            ...req.user,
            access_token:req.token
        }
}
    );
}

const logout = (req, res) => {
    try {
        res.clearCookie("token");
        return res.status(200).json({
            EM : "Success",
            EC : 200,
            DT : ""
        });
    } catch (error) {
        console.log(error);
    }
}
    module.exports = {
        apiTest,
        registerHandle,
        loginHandle,
        read,
        create,
        update,
        _delete,
        getAccount,
        logout
    }