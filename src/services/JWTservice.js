import db from "../models/index";
const getGroupWithRoles = async (user) => {
  console.log("user=>>", user);
  let roles = await db.Group.findOne({
    where: {
      id: user.groupID,
    },
    attributes: ["id", "name", "description"],
    include: [
      {
        model: db.Role,
        attributes: ["id", "url", "description"],
        through: {
          attributes: [],
        },
      },
    ],
  });
  return roles;
};
module.exports = {
  getGroupWithRoles,
};
