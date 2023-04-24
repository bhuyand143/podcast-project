const router = require('express').Router();
const User = require('../model/User');
const CryptoJS = require('crypto-js');
const verify = require('../verifyToken');

//Update
router.put('/:id', verify, async (req, res) => {
    
    if (req.user.id === req.params.id || req.user.isAdmin) {    
        if (req.body.password)
            req.body.password = CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString()

        try {
            const updateUser = await User.findByIdAndUpdate(req.params.id, {
                $set: req.body,
            }, {
                new: true
            }
            );
            res.status(200).json(updateUser);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        return res.status(403).json("You can update only your account");
    }
})


//Delete
router.delete('/:id', verify, async (req, res) => {

    if (req.user.id === req.params.id || req.user.isAdmin) {
        try {
            await User.findByIdAndDelete(req.params.id)
            res.status(200).json("Your account has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else {
        return res.status(403).json("You can delete only your account");
    }
})

//Get
router.get('/find/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        const { password, ...info } = user._doc;
        res.status(200).json(info);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Get All Users
router.get('/', verify, async (req, res) => {
    const query = req.query.new;
    if (req.user.isAdmin) {
       
        try {
            const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        return res.status(403).json("You are not allowed to see all users");
    }
})


//Get Stats
router.get('/stats',async(req,res)=>{

    try {
        const data = await User.aggregate([
            {
                $project : {
                    month : {$month : "$createdAt"},
                },

            },
            {
                $group : {
                    _id : "$month",
                    total : {$sum : 1},
                },
            },
        ]);
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json(error);
    }
})

//Add to favourite
//Add to favourite
router.post('/favourite',async(req,res)=>{
    try {
        const user = await User.findById(req.body.id);
        if(user)
        {
        if(!user.favourite.includes(req.body.podcast))
        {
        await user.updateOne({
            $push : { favourite : req.body.podcast }}
    );
    console.log("Hello");
    return res.status(201).json("Podcast was added to favourite list");
        }
        else
        {
            await user.updateOne({ $pull : {favourite:req.body.podcast}})
            res.status(200).json("Podcast was removed from favourite list")
        }
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

//Add to Continue Watching
router.post('/continue',async(req,res)=>{
    try {
        const user = await User.findById(req.body.id);
        if(user)
        {
        if(!user.continue.includes(req.body.podcast))
        {
        await user.updateOne({
            $push : { continue : {podcast: req.body.podcast,time: req.body.time} }}
            
    );
    return res.status(201).json("Podcast was added to continue list");
        }
        }
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router