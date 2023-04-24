const mongoose = require('mongoose');

const PodcastSchema = new mongoose.Schema({
    title : {type:String,require:true,unique:true},
    desc : {type:String},
    category : {type:String},
    type: {type:String},
    speaker : {type:String},
    img : {type:String},
    file : {type:String}
},
{timestamps :true}
);

module.exports = mongoose.model("Podcast",PodcastSchema);