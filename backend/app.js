import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";

import { pool } from "./config/db.js";
import { listenFriendsChanges } from "./listeners/friendsListener.js";

const app = express();

app.use(cors());
app.use(express.json());

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        origin: "http://localhost:4200",
        methods: ["GET", "POST"]
    }
});

app.get("/", (req, res) => {
    res.send("Backend funcionando");
});

app.get("/friends", async (req, res) => {
    try {
        const result = await pool.query("SELECT * FROM my_friends ORDER BY id ASC");
        res.json(result.rows);
    } catch (error) {
        console.error("Error al obtener amigos:", error);
        res.status(500).json({
            message: "Error al obtener amigos"
        });
    }
});

io.on("connection", (socket) => {
    console.log("Cliente conectado a Socket.io:", socket.id);

    socket.on("disconnect", () => {
        console.log("Cliente desconectado de Socket.io:", socket.id);
    });
});

listenFriendsChanges(io);

server.listen(3000, () => {
    console.log("Servidor corriendo en http://localhost:3000");
});