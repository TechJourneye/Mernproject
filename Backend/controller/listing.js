
const Listing=require("../models/listing");



const mbxGeocoding = require("@mapbox/mapbox-sdk/services/geocoding");
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.getAllListing=async (req, res) => {
  let allListing = await Listing.find();
  res.send(allListing);
}

module.exports.createListing=async (req, res) => {
 let response= await geocodingClient
    .forwardGeocode({
      query: req.body.listing.location,
      limit: 1,
    })
      .send()
    let url=req.file.path;
    let filename=req.file.filename;
    console.log(url,filename);
    console.log(req.body.listing);
    let listing=new Listing(req.body.listing);
     listing.img={url,filename};
    listing.owner= req.user._id;
    listing.geometry=response.body.features[0].geometry;
     listing=await  listing.save()   
     console.log(listing);

    res.status(201).json({
      success: true,
      message: "New Listing Created Successfully",
      listing
    });
}

module.exports.showListing=async (req, res) => {
 
    let { id } = req.params;
    let listing = await Listing.findById(id)
      .populate({ path: "reviews", populate: { path: "author" } })
      .populate("owner");
      if(!listing){
        return res.status(404).json({ message: "Listing not found" });
      }
    res.json(listing);
}

module.exports.deleteListing= async(req,res)=>{
 const { id } = req.params;
     await Listing.findByIdAndDelete(id);
     res.json({ message: "Listing deleted successfully" });
}

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;

  let listing = await Listing.findById(id);

  if (!listing) {
    return res.status(404).json({ message: "Listing not found" });
  }
  if (req.body.listing.location) {
    let response = await geocodingClient
      .forwardGeocode({
        query: req.body.listing.location,
        limit: 1,
      })
      .send();

    listing.geometry = response.body.features[0].geometry;
  }

  listing.set(req.body.listing);

  if (req.file) {
    listing.img = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await listing.save();

  res.json({
    message: "Updated Successfully",
    listing
  });
};