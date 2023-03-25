import bcrypt from 'bcryptjs';
import mysql from "mysql2/promise";
import bluebird from "bluebird";
import { createConnection } from 'mysql2';
// conect to database by bluebird

const salt = bcrypt.genSaltSync(10);

const hashPassword = (password) => {
    return bcrypt.hashSync(password, salt);
}

const createNewUser = async (email, password, userName) => {
    const hashPass = hashPassword(password);
    const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "learn",
    Promise: bluebird
  });
    connection.query(
        "INSERT INTO users (email, password, username) VALUES (?, ?, ?)",
        [email, hashPass, userName],
        function (err, results, fields) {
          if (err) console.log(err);
          console.log(results); // results contains rows returned by server
          console.log(fields); // fields contains extra meta data about results, if available
        }
      );
}

const getListUsers = async () => {
  let users = [];
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "learn",
    Promise: bluebird
  });
    
    try{
      const [rows, fields] = await connection.execute('SELECT * FROM users');
      return rows;
    }catch(err){
        console.log(err);
    }
}

const deleteUser = async (id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "learn",
    Promise: bluebird
  });
  try{
    const [rows, fields] = await connection.execute('DELETE FROM users WHERE id = ?', [id]);
    return rows;
  }
  catch(err){
    console.log(err);
  }
}

const updateUser = async (userName,id) => {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "learn",
    Promise: bluebird
  });
  console.log(userName,id);
  try{
    const [rows, fields] = await connection.execute('UPDATE users SET username = ? WHERE id = ?', [userName, id]);
    return rows;
  }
  catch(err){
    console.log(err);
  }
}
module.exports = {
    createNewUser,
    getListUsers,
    deleteUser,
    updateUser
}