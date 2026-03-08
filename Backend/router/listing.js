const express=require("express");
const router=express.Router();
const Listing=require("../models/listing");
const {validateListing}=require("../middleware/middleware")

const { storage } = require("../cloudConfig");
const multer = require("multer");
const upload = multer({ storage })

const WrapAsync = require("../utils/WrapAsync");
const listingController=require("../controller/listing");

 const { userVerification ,isOwner}=require("../middleware/AuthMiddleware");

const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

router.route("/")
.get(WrapAsync(listingController.getAllListing));

router.route("/")
.post( userVerification,upload.single("listing[img]"),validateListing,WrapAsync(listingController.createListing));

router.route("/:id")
.get( WrapAsync(listingController.showListing))
.put(userVerification, isOwner, upload.single("listing[img]"),WrapAsync(listingController.updateListing))
.delete(userVerification, isOwner, WrapAsync(listingController.deleteListing));

module.exports=router;