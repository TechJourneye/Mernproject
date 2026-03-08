const express=require("express");
const router=express.Router({mergeParams:true});
const  userController=require("../controller/user");
const {userVerification}=require("../middleware/AuthMiddleware")
const wrapAsync=require("../utils/WrapAsync")


router.route("/signup")
.post(userController.signup);

router.route("/login")
.post(userController.login)



module.exports=router