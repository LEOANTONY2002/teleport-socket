const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const port = process.env.PORT || 5000;

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "https://leoteleport.herokuapp.com",
        methods: ["GET", "POST", "DELETE"],
    },
});

io.on("connection", (socket) => {
    console.log(socket.id);

    socket.on("join", (data) => {
        socket.join(data);
        console.log(data);
    });

    socket.on("send", (data) => {
        socket.to(data).emit("receive", data);
        console.log(data);
    });

    socket.on("disconnect", () => {
        console.log("Dis..", socket.id);
    });
});

server.listen(port, () => {
    console.log("START");
});