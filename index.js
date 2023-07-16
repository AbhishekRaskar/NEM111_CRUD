const express = require("express");
const { connection } = require("./db");
const { userRouter } = require("./Routes/userRoute");
const { noteRouter } = require("./Routes/noteRoute");

const app = express()
require("dotenv").config()

app.use(express.json())
app.use("/users", userRouter)
app.use("/notes", noteRouter)

app.listen(process.env.port, async () => {
    try {
        await connection
        console.log(`Server is running at PORT ${process.env.port}`);
        console.log("Connected to DB");
    } catch (error) {
        console.log(error.message);
        console.log("Something Went Wrong....!");
    }
})