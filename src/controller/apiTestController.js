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
    console.log(req.body);
       const reponse = await  authServices.loginService(req.body);
       console.log("ress ::=>>>",reponse);
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
    module.exports = {
        apiTest,
        registerHandle,
        loginHandle,
        read,
        create,
        update,
        _delete
    }