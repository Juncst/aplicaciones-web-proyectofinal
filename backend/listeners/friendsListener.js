import { pool } from "../config/db.js";

export const listenFriendsChanges = async (io) => {
    const client = await pool.connect();

    await client.query("LISTEN my_friends_channel");

    console.log("Escuchando los cambios en my_friends_channel...");

    client.on("notification", (msg) => {
        const data = JSON.parse(msg.payload);

        console.log("Los cambios se recibieron desde PostgreSQL:");
        console.log(data);

        io.emit("friendUpdated", data);
    });
};