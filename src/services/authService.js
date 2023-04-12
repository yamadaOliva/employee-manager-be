import db from '../models/index.js';
import bcrypt from 'bcryptjs';
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}
const registerUser=async (user) =>{
    try{
        await db.User.create({
            username: user.username,
            email: user.email,
            password: hashPassword(user.password),
        });
    }catch(err){
        console.log(err);
    }
    
}

const registerService =async (user)  =>{
    const user1 = await db.User.findOne({
        where: {
            email: user.email,
        }
    });
    console.log("cll=>>",user1);
    if(user1){
        return {
            EM : "Email is already exist",
            EC : -2,
            DT :""
        };
    }else{
        await db.User.create({
            username: user.username,
            email: user.email,
            password: hashPassword(user.password),
        });
        return {
            EM : "Register success",
            EC : 200,
            DT :""
        };
    }
}
module.exports = {
    registerUser,
    registerService,
}