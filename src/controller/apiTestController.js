import authServices from '../services/authService.js';

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
    module.exports = {
        apiTest,
        registerHandle,
        loginHandle
    }