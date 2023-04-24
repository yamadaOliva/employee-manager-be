import { TableHints, literal } from "sequelize/dist/index.js";
import db from "../models/index.js";

const getAllUser = async () => {
    let users = [];
    try{
    users = await db.User.findAll({
        attributes: ['id', 'username', 'email', 'phone',"sex"],
        include: {model : db.Group, attributes: ['name','description']},
    });
    return {
        EM: "data",
        EC: 200,
        DT: users
    }}catch(err){
        console.log(err);
        return {
            EM: "something wrong",
            EC: -5,
            DT: "",
        }
    }
}

const getUserByPage = async (page,limit)=>{
    let offset = (page-1)*limit;

    try{
        let {count,rows} = await db.User.findAndCountAll({
            attributes: ['id', 'username', 'email', 'phone',"sex"],
            include: {model : db.Group, attributes: ['name','description']},
            offset: offset,
            limit : limit
        })

        let totalPages = Math.ceil(count/limit);
        let data = {
            totalRows : count,
            totalPages:totalPages,
            users:rows
        }
        return{
            EM:"Success",
            EC:200,
            DT:data
        }
    }catch(err){
        console.log(err)
        return {
            EM: "something wrong",
            EC: -5,
            DT: "",
        }
    }
}

const createNewUser = async (data) => {
    try{
        await db.User.create({

        })
    }catch(err){
        console.log(err)
    }
}

 const updateUser = async (data) => {
    let user = await db.User.findOne({
        where:{id:data.id}
    })
    if(user){
        
    }else{
        return {
            EM:"user not found",
            EC:"-1",
            DT:""
        }
    }
 }

const deleteUser = async (id) => {
    try{
        await db.User.delele({
            where:{id:id}
        })
    }catch(err){
        console.log(err)
    }
}

module.exports = {
    getAllUser,
    getUserByPage,
    createNewUser,
    updateUser,
    deleteUser
}