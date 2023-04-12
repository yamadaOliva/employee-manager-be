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
            console.log(code);
            return res.status(200).json(code);
        }
        
    }catch(err){
        console.log(err);
    }
}
    module.exports = {
        apiTest,
        registerHandle,
    }