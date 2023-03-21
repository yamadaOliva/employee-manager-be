import userService from "../services/userService.js";

const testUser =async (req, res) => {
  let userList = await userService.getListUsers();
  console.log(userList);
  return res.render("user",{userList});
};

const handleCreateNewUser = (req, res) => {
  console.log(req.body);
  let email = req.body.emailName;
  let password = req.body.passwordName;
  let userName = req.body.userName;
  userService.createNewUser(email, password, userName);
  
 return res.send("create new user");
};
module.exports = {
  testUser,
  handleCreateNewUser,
};
