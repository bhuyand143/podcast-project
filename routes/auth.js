const router = require('express').Router();
const User = require('../model/User');
const CryptoJs = require('crypto-js');
const jwt = require('jsonwebtoken');

//Register user

router.post('/register',async (req,res)=>{

    const newUser = new User({
        username : req.body.username,
        email : req.body.email,
        password : CryptoJs.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()
    })

    try{
        const user = await newUser.save();
        return res.status(201).json(user);
    }
    catch(error){
        return res.status(500).json(error);
    }

})


//Login User

router.post('/login', async(req,res)=>{
    console.log("hii ima in login");
    try {

        const user = await User.findOne({email : req.body.email});
        if(!user)
        {
            return res.status(401).json("Wrong username or password");
        }
        
        const bytes  = CryptoJs.AES.decrypt(user.password, process.env.SECRET_KEY);
        const originalPassword = bytes.toString(CryptoJs.enc.Utf8);
        if(originalPassword !== req.body.password)
        return res.status(401).json("Wrong username or password");

        const {password, ...info} = user._doc;
        const accessToken = jwt.sign(
            {id: user._id, isAdmin: user.isAdmin},process.env.SECRET_KEY, {expiresIn: "5d"});
            return res.status(200).json({...info,accessToken})
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router