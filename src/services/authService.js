import db from "../models/index.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};
const checkEmailExist = async (email) => {
  const user = await db.User.findOne({
    where: {
      email: email,
    },
  });
  return user ? true : false;
};

const findUserByEmail = async (email) => {
  const user = await db.User.findOne({
    where: {
      email: email,
    },
  });
  return user;
};

const comparePassword = (password, hashPassword) => {
  return bcrypt.compareSync(password, hashPassword);
};

const registerUser = async (user) => {
  try {
    await db.User.create({
      username: user.username,
      email: user.email,
      password: hashPassword(user.password),
    });
  } catch (err) {
    console.log(err);
  }
};

const registerService = async (user) => {
  const user1 = await db.User.findOne({
    where: {
      email: user.email,
    },
  });
  console.log("cll=>>", user1);
  if (user1) {
    return {
      EM: "Email is already exist",
      EC: -2,
      DT: "",
    };
  } else {
    await db.User.create({
      username: user.username,
      email: user.email,
      password: hashPassword(user.password),
      phone: user.phone,
      sex: "female",
      groupID: 1,
    });
    return {
      EM: "Register success",
      EC: 200,
      DT: "",
    };
  }
};

const loginService = async (user) => {
  const test = await checkEmailExist(user.email);
  let user1 = {};
  user1 = await findUserByEmail(user.email);
  if (test) {
    if (comparePassword(user.password, user1.password)) {
      return {
        EM: "Login success",
        EC: 200,
        DT: "",
      };
    } else {
      return {
        EM: "Password is incorrect",
        EC: -3,
        DT: "",
      };
    }
  } else {
    return {
      EM: "Email is not exist",
      EC: -4,
      DT: "",
    };
  }
};

module.exports = {
  registerUser,
  registerService,
  loginService,
};
