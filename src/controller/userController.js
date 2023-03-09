import mysql from "mysql2";

const testUser = (req, res) => {
  return res.render("user");
};
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  database: "learn",
});

const handleCreateNewUser = (req, res) => {
  console.log(req.body);
  let email = req.body.emailName;
  let password = req.body.passwordName;
  let userName = req.body.userName;
  connection.query(
    "INSERT INTO user (email, password, username) VALUES (?, ?, ?)",
    [email, password, userName],
    function (err, results, fields) {
      if (err) console.log(err);
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available
    }
  );
  return res.send("create new user");
};
module.exports = {
  testUser,
  handleCreateNewUser,
};
