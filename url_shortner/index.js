const express = require("express");
const {connectToMongoDb}=require("./connection");
const urlRoute=require("./routes/url");
const app = express();
const URL=require("./models/url");

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("mongodb connected"))
.catch((err)=> console.log("mongo error",err));

app.use(express.json());

app.use("/url",urlRoute);

app.get("/:shortId",async(req,res)=>{
  const shortId=req.params.shortId;
  const entry=await URL.findOneAndUpdate({
    shortId
  },{$push:{
    visitHistory:{
        timestamp:Date.now(),
    }
  }
  })
  res.redirect(entry.redirectUrl);
})

app.listen(8001,()=>{console.log("sever started");});
