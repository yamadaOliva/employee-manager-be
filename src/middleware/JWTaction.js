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
    console.log(data);
    
}
module.exports = {
    CreateJWT,
    verifyToken
}