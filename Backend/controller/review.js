const Listing=require("../models/listing");
const Review=require("../models/review");

module.exports.createReview=async (req, res) => {
    const { id } = req.params;
    const { content, rating } = req.body.review;
  
    if (!id) {
      return res.status(400).json({ error: "Listing ID is required" });
    }

    let review = new Review({
      content,
      rating,
      author: req.user._id,
      createdAt: new Date()
    });

    review = await review.save();

    let listing = await Listing.findById(id);
    
    if (!listing) {
      return res.status(404).json({ error: "Listing not found" });
    }

    listing.reviews.push(review);
    await listing.save();

    res.json({ message: "Review created successfully", review });
  
}

module.exports.deleteReview=async (req,res)=>{
     let {id,reviewId}=req.params;
      let listing=await Listing.findByIdAndUpdate(id,{$pull:{reviews:reviewId}})   ;
      let review=await Review.findByIdAndDelete(reviewId);
       res.json({ message: "Review deleted successfully", review });
  }