const express = require("express");
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoute = require('./routes/auth');
const userRoute = require('./routes/user');
const podcastRoute = require('./routes/podcast');
const listRoute = require('./routes/list')
const path= require('path')
const cors = require("cors");

dotenv.config();

mongoose.connect(process.env.MONGO_URL)
.then(()=>{console.log("Database connection succssfull");})
.catch((err)=>{console.log(err);})

app.use(cors());
app.use(express.json());

app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/podcast",podcastRoute);
app.use("/api/lists",listRoute);

app.use(express.static("Podcast/build"));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "Podcast", "build", "index.html"));
});

const PORT = process.env.PORT || 8900;
app.listen(PORT,()=>{
    console.log("Backend server is running");
})