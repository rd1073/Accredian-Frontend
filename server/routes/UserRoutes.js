const express = require("express")
const { db }=require("../config/db")
const { registerUser, loginUser, checkLoginStatus}=require("../controllers/UserController");
const verifyJWT=require("../config/verifyJWT")
const router=express.Router();


router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/login").get(checkLoginStatus);
router.route('/isUserAuth').get(verifyJWT , (req, res) => {
    res.send("You are authenticated Congrats:")
})




module.exports=router;






 