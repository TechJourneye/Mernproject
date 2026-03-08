const express=require("express");
const WrapAsync = require("../utils/WrapAsync");
const router=express.Router();
const Listing=require("../models/listing");
const ExpressError = require("../utils/ExpressError");

router.get(
  "/search",
  WrapAsync(async (req, res, next) => {

    const { country } = req.query;

 if (!country || country.trim() === "") {
   return res.json([]);
 }

 const listings = await Listing.find({
   country: { $regex: country.trim(), $options: "i" }
 });

 res.json(listings);


  })
);

module.exports = router;