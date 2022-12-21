const { Router } = require("express")
const { getUsers, agregar, getUser, deleteUser, authUser, verifyToken } = require("../controllers")

const router = Router()
router.get("/getusers", getUsers)
router.get("/getuser", async (req, res) => {
    const data = await getUser(req.body)
    console.log(data);
    res.json(data)
    return data
})
router.post("/addUser", agregar)
router.delete("/deleteUser", verifyToken, deleteUser)
router.get("/validUser", authUser)
module.exports = router
