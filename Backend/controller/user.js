const User=require("../models/user");
const {createSecretToken}=require("../utils/secretToken");
 const WrapAsync=require("../utils/WrapAsync")
const bcrypt = require("bcryptjs");


module.exports.signup =  WrapAsync(async (req, res) => {

    const { email, password, username} = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ message: "User already exists" ,success:false,existingUser});
    }
    const user = await User.create({ email, password, username});
    const token = createSecretToken(user._id);
res.cookie("token", token, {
       httpOnly: false,
      maxAge:7*24*60*60*1000,
    });
    res.status(201)
    .json({ message: "User signed in successfully", success: true, user });
});

module.exports.login = WrapAsync(async (req, res) => {
    const { username, password } = req.body;
    if(!username || !password ){
      return res.status(400).json({message:'All fields are required', success: false})
    }
    const user = await User.findOne({ username });
    if(!user){
      return res.status(400).json({message:'Incorrect password or username', success: false }) 
    }
    const auth = await bcrypt.compare(password,user.password)
    if (!auth) {
      return res.status(400).json({message:'Incorrect password or username', success: false }) 
    }
     const token = createSecretToken(user._id);
res.cookie("token", token, {
      // withCredentials: true,
      httpOnly: false,
      maxAge:7*24*60*60*1000,
    });
     res.status(201).json({ message: "User logged in successfully", success: true });
  
})