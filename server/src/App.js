let app = require("express")();
let http = require("http").Server(app);
let io = require("socket.io")(http);

if (process.env.NODE_ENV === "development") {
  // eslint-disable-next-line global-require
  require("dotenv").config({
    path: ".env",
    silent: true,
  });
}

io.on("connection", socket => {
  console.log("user connected");

  socket.on("disconnect", function() {
    console.log("user disconnected");
  });

  socket.on("data", data => {
    console.log(data);
    socket.broadcast.emit("data", data);
  });
});

const port = process.env.PORT;
http.listen(port, () => {
  console.log(`🚀 Server started on port ${port}`);
});
