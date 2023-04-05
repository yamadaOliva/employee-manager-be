import userService from "../services/userService.js";

const testUser =async (req, res) => {
  let userList = await userService.getListUsers();
  return res.render("user",{userList});
};

const handleCreateNewUser = async(req, res) => {
  let email = req.body.emailName;
  let password = req.body.passwordName;
  let userName = req.body.userName;
  userService.createNewUser(email, password, userName);
 return res.redirect("/user");
};

const handleDeleteUser = async (req, res) => {
  let id = req.params.id;
  await userService.deleteUser(id);
  return res.redirect("/user");
};

const handleUpdateUser = async (req, res) => {
  return res.render("user-update",{id: req.params.id});
};

const handleUpdateUser1 = async (req, res) => {
  let id = req.params.id;
  let userName = req.body.userName;
  await userService.updateUser(userName, id);
  return res.redirect("/user");
};
module.exports = {
  testUser,
  handleCreateNewUser,
  handleDeleteUser,
  handleUpdateUser,
  handleUpdateUser1
};
