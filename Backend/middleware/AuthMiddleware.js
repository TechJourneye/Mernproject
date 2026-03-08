const User = require("../models/user");
const Listing =require("../models/listing");
const Review = require("../models/review");

require("dotenv").config();
const jwt = require("jsonwebtoken");

module.exports.userVerification = async (req, res, next) => {

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: No token"
    });
  }

  try {
    const data = jwt.verify(token, process.env.TOKEN_KEY);

    const user = await User.findById(data.id);

    if (!user) {
      return res.status(403).json({
        success: false,
        message: "User not found"
      });
    }

    req.user = user;   
    next();          
  } catch (err) {
    return res.status(401).json({
      success: false,
      message: "Invalid token"
    });
  }
};

module.exports.isOwner=  async (req,res,next)=>{
  const { id } = req.params;

  const listing = await Listing.findById(id);
  if (!listing) {
    return res.status(404).json({
      success: false,
      message: "Listing not found"
    });
  }
  if (!listing.owner.equals(req.user._id)) {
    return res.status(403).json({
      success: false,
      message: "You are not authorized to modify this listing"
    });
  }

  next();;
}

module.exports.reviewDelete = async (req, res, next) => {
  try {
    const { reviewId } = req.params;

    // find review
    const review = await Review.findById(reviewId);

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    // Check author
    if (!review.author.equals(req.user._id)) {
      return res.status(403).json({
        message: "You are not allowed to delete this review"
      });
    }

    next();
  } catch (err) {
    next(err);
  }
};