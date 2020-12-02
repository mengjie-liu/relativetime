let express = require("express");
let app = express();
let http = require("http").createServer(app);
let port = process.env.port || 3000;
let io = require("socket.io")(http);
const low = require("lowdb");

const bodyParser = require("body-parser");

// app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));

const FileSync = require("lowdb/adapters/FileSync");
const adapter = new FileSync("db.json");
const db = low(adapter);

//initiate a blank database if it doesn't exist
let dbTemplate = {
  clocks: [],
};

db.defaults(dbTemplate).write();
let clocks = db.get("clocks");

io.on("connection", (socket) => {
  console.log("a user connected");
  io.emit("historyclocks", clocks);
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
  socket.on("removeclock", (removeinfo) => {
    db.get("clocks").remove(removeinfo).write();
  });
  socket.on("userclock", (clockinfo) => {
    db.get("clocks").push(clockinfo).write();
    let allclocks = db.get("clocks");
    io.emit("newhistoryclocks", allclocks);
    // io.emit("newuserclock", clockinfo);
  });
});

//launch the server
http.listen(port, () => {
  console.log(`listening on port :${port}`);
});
