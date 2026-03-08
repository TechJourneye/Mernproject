const express=require("express");
const router=express.Router({mergeParams: true});

const Review=require("../models/review");
const Listing=require("../models/listing");
const WrapAsync = require("../utils/WrapAsync");
const { userVerification, reviewDelete } = require("../middleware/AuthMiddleware");
const {validateReview}=require("../middleware/middleware");

const reviewController=require("../controller/review");
router.route("/")
.post( userVerification, validateReview, WrapAsync(reviewController.createReview));

router.route("/:reviewId")
.delete(userVerification, reviewDelete, WrapAsync(reviewController.deleteReview))

module.exports=router;