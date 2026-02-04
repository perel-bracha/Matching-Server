const conDB = require("./src/DB/connectToDB");

function deleteUsersTable() {
  conDB.query("DROP TABLE IF EXISTS users", function (err, result) {
    if (err) throw err;
    console.log("Users table deleted");
  });
}

deleteUsersTable();
module.exports = deleteUsersTable;