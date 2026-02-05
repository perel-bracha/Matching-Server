// require("dotenv").config();
// const express = require("express");
// const cors = require("cors");
// const http = require("http");
// const socketIo = require("socket.io");

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server, {
//   cors: { origin: "*" }, // מאפשר חיבורים מכל מקום
// });
// app.use(cors());
// app.use(express.json()); // מאפשר שליחת JSON בבקשות

// // נתיבים לדוגמה
// app.use("/users", require("./src/API/users.routes"));
// app.use("/apartments", require("./src/API/apartments.routes"));
// app.use("/donations", require("./src/API/donations.routes")(io));
// io.on("connection", (socket) => {
//   console.log("לקוח מחובר");

//   socket.on("disconnect", () => {
//     console.log("לקוח התנתק");
//   });
// });
// app.get("", (req, res) => {
//   return res.status(200).json("maching server");
// });

// const PORT = process.env.PORT || 8080;
// server.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
const conDB = require("./src/DB/connectToDB");
const fs = require("fs");

function createTable(query, tableName) {
  return new Promise((resolve, reject) => {
    conDB.query(query, (err, result) => {
      if (err) return reject(err);
      console.log(`${tableName} table created`);
      resolve(result);
    });
  });
}

async function createTables() {
  const tableFiles = [
    // "./sqlTables/apartments.sql",
    // "./sqlTables/users.sql",
    // "./sqlTables/donations.sql",
        "itemDonations.sql",
  ];

  for (const file of tableFiles) {
    const query = fs.readFileSync(file, "utf8");
    const tableName = file.split("/").pop().split(".")[0];
    await createTable(query, tableName);
  }
}
createTables();
module.exports = createTables;
