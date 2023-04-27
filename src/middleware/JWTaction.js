import jwt from "jsonwebtoken"
require("dotenv").config()

const CreateJWT = (payload={
    name :"Viet Anh",
    age:"18"
}) => {
    let payloadSend = {...payload};
    let token
    try{
      token   = jwt.sign(payloadSend, process.env.JWT_SECRET);
    }catch(err){
        console.log(err);
    }
    return token;
}

const verifyToken=(token)=>{
    let key = process.env.JWT_SECRET
    let data;
    try{
        data = jwt.verify(token,key);
    }catch(err){
        console.log(err);
    }
    return data; 
}

const checkUser = (req , res , next) =>{
    let cookies = req.cookies;
    console.log("cookies=>>",cookies);
    if(cookies){
        console.log("token=>>",cookies.token);
        let data = verifyToken(cookies.token);
        console.log("data=>>",data);
    }else{
        return res.status(401).json({
            EM : "Unauthorized",
            EC : -2,
            DT : ""
        })
    }
}
module.exports = {
    CreateJWT,
    verifyToken,
    checkUser
}