const express = require("express")
const { connection } = require("./db")
const { userRouter } = require("./routes/user.routes")
const { doctorRouter } = require("./routes/doctor.routes")
require("dotenv").config()
const cors = require("cors")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/users", userRouter)
app.use("/doctors", doctorRouter)


app.listen(process.env.PORT, async () => {
    try {
        await connection
        console.log("Connected to DB!!");
    } catch (error) {
        console.log(error);
        console.log("Something went wrong!!");
    }
    console.log(`Application running on ${process.env.PORT}`);
})