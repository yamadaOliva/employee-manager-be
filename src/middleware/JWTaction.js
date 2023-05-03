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
   
    const nonCheck = ["/","/login","/register"];
    console.log('req.path',req.path)
    if(nonCheck.includes(req.path)){
        return next();
    }else{
    let cookies = req.cookies;
    console.log('cookies123',cookies)
    if(cookies){
        let data = verifyToken(cookies.token);
        req.user = data;
        req.token = cookies.token;
        if(data){
            next();
        }
    }else{
        return res.status(401).json({
            EM : "Unauthorized",
            EC : -2,
            DT : ""
        })
    }
}
}

const checkPermission = (req , res , next) =>{
    const nonCheck = ["/","/login","/register"];
    if(nonCheck.includes(req.path)){
        return next();
    }
  if(req.user){
    let email = req.user.email;
    let roles = req.user.roles.Roles;
    let currentUrl = req.path;
   
    let canAccess = roles.some(item=>{
        if(item.url==currentUrl){
            return true;
        }
    })
  
    if(canAccess){
        next();
    }else{
        console.log('1234')
        return res.status(403).json({
            EM : "Unauthorized",
            EC : -3,
            DT : ""
        })
    }
  
}
}
module.exports = {
    CreateJWT,
    verifyToken,
    checkUser,
    checkPermission
}