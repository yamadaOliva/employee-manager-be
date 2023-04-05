import bcrypt from 'bcryptjs';
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import { createConnection } from 'mysql2';
import db from "../models/index";
// conect to database by bluebird

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const getUserById = async (id) => {
 let user = {}
 user = await db.User.findOne({
  where :{
    id: id
  }
  });
}

const createNewUser = async (email, password, userName) => {
    const hashPass = hashPassword(password);
   try{
      await db.User.create({
        email: email,
        password: hashPass,
        username: userName
      });
   }catch(err){
        console.log(err);
   }
   
}

const getListUsers = async () => {

let newuser = await db.User.findOne({
  attributes: ['id', 'username', 'email'],
  where: {
    id: 4
  },
  include: {model : db.Group},
  raw : true,
  nest : true,
});
console.log(newuser);

try{
let RowTest = await db.Role.findAll({
  include: {model : db.Group, where: {id: 1}},
  raw : true,
  nest : true,
})
console.log(RowTest);
}catch(err){
  console.log(err);
}


  let users = [];
  users = await db.User.findAll();
  return users;
}

const deleteUser = async (id) => {
  await db.User.destroy({
    where: {
      id: id
    }
  });
}

const updateUser = async (userName,id) => {
  await db.User.update({
    username: userName
  },{
    where: {
      id: id
    }
  });
}

module.exports = {
    createNewUser,
    getListUsers,
    deleteUser,
    updateUser
}