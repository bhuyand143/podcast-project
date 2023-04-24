const router = require('express').Router();
const Podcast = require('../model/Podcast');
const verify = require('../verifyToken');

//Create
router.post('/',verify,async(req,res)=>{
    if(req.user.isAdmin)
    {
        const newPodcast = new Podcast(req.body);
        try {
            const savedPodcast = await newPodcast.save();
            res.status(201).json(savedPodcast);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else
    {
        return res.status(401).json("You are not authorized");
    }
})


//Update
router.put('/:id',verify,async(req,res)=>{
    if(req.user.isAdmin)
    {
        try {
            const updatePodcast = await Podcast.findByIdAndUpdate(req.params.id,{
                $set : req.body
            },
            {new :true}
            );
            res.status(202).json(updatePodcast);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else
    {
        return res.status(401).json("You are not authorized");
    }
})


//Delete
router.delete('/:id',verify,async(req,res)=>{
    if(req.user.isAdmin)
    {
        try {
            await Podcast.findByIdAndDelete(req.params.id);
            res.status(200).json("The podcast has been deleted");
        } catch (error) {
            res.status(500).json(error);
        }
    }
    else
    {
        return res.status(401).json("You are not authorized");
    }
})


 //Get
 router.get('/find/:id',async(req,res)=>{
    try {
         const podcast = await Podcast.findById(req.params.id);
        res.status(200).json(podcast);
    } catch (error) {
       res.status(500).json(error);
    }
})


//Get All
router.get('/',async(req,res)=>{
    
    try {
         const podcast = await Podcast.find();
        res.status(200).json(podcast.reverse());
    } catch (error) {
       res.status(500).json(error);
    }
    
    
})

//Get recent 5
router.get('/recent', verify, async(req,res)=>{
    if(req.user.isAdmin)
    {
    try {
         const podcast = await Podcast.find().sort({ _id: -1 }).limit(5);
        res.status(200).json(podcast.data);
    } catch (error) {
       res.status(500).json(error);
    }
    }
    else
    {
     return res.status(401).json("You are not authorized")
    }
})


module.exports = router;