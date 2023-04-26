import { TableHints, literal } from "sequelize/dist/index.js";
import db from "../models/index.js";
import bcrypt from "bcryptjs";
const salt = bcrypt.genSaltSync(10);
const hashPassword = (password) => {
  return bcrypt.hashSync(password, salt);
};
const getAllUser = async () => {
  let users = [];
  try {
    users = await db.User.findAll({
      attributes: ["id", "username", "email", "phone", "sex"],
      include: { model: db.Group, attributes: ["name", "description"] },
    });
    return {
      EM: "data",
      EC: 200,
      DT: users,
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "something wrong",
      EC: -5,
      DT: "",
    };
  }
};

const getUserByPage = async (page, limit) => {
  let offset = (page - 1) * limit;

  try {
    let { count, rows } = await db.User.findAndCountAll({
      attributes: [
        "id",
        "username",
        "email",
        "phone",
        "sex",
        "address",
        "groupID",
      ],
      include: { model: db.Group, attributes: ["name", "description"] },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
    });

    let totalPages = Math.ceil(count / limit);
    let data = {
      totalRows: count,
      totalPages: totalPages,
      users: rows,
    };
    return {
      EM: "Success",
      EC: 200,
      DT: data,
    };
  } catch (err) {
    console.log(err);
    return {
      EM: "something wrong",
      EC: -5,
      DT: "",
    };
  }
};

const createNewUser = async (data) => {
  let user = await db.User.findOne({
    where: {
      email: data.email,
    },
  });
  console.log(user);
  if (user) {
    return {
      EM: "user existed",
      EC: -5,
      DT: "",
    };
  } else {
    try {
      await db.User.create({
        username: data.userName,
        email: data.email,
        password: hashPassword(data.password),
        phone: data.phone,
        sex: data.sex,
        groupID: data.group,
        address: data.address,
      });
      return {
        EM: "success",
        EC: 200,
        DT: "",
      };
    } catch (err) {
      console.log(err);
    }
  }
};

const updateUser = async (data) => {
  let user = await db.User.findOne({
    where: { id: data.id },
  });
  console.log(data)
  if (user) {
    await user.update({
      username: data.username,
      address: data.address,
      groupID: data.groupID,
      sex: data.sex,
    });
    return {
        EM:"succsess",
        EC:200,
        DT:""
    }
  } else {
    return {
      EM: "user not found",
      EC: "-1",
      DT: "",
    };
  }
};

const deleteUser = async (id) => {
  try {
    let user = await db.User.findOne({
      where: { id: id },
    });
    if (user) {
      await user.destroy();
      return {
        EM: "Success",
        EC: 200,
        DT: "",
      };
    } else {
      return {
        EM: "user not found",
        EC: "-1",
        DT: "",
      };
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getAllUser,
  getUserByPage,
  createNewUser,
  updateUser,
  deleteUser,
};
