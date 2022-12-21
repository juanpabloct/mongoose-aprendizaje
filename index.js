const express = require("express")
const dotenv = require("dotenv").config()
const app = express()
app.use(express.json())
app.use("/user/", require("./routes/user"))

app.listen(process.env.PORT, () => console.log(process.env.PORT))