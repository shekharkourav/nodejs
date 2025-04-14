const express = require("express");
const cookieParser=require("cookie-parser");
const path=require("path");
const app = express();

const {connectToMongoDb}=require("./connection");
const URL=require("./models/url");
const urlRoute=require("./routes/url");
const staticRoute=require("./routes/staticRouter");
const userRoute=require("./routes/user");
const {checkForAuthentication,restrictTo}=require("./middlewares/auth");

connectToMongoDb("mongodb://127.0.0.1:27017/short-url")
.then(()=>console.log("mongodb connected"))
.catch((err)=> console.log("mongo error",err));

app.set("view engine","ejs");
app.set("views",path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthentication);


app.use("/url",restrictTo(["NORMAL","ADMIN"]),urlRoute);
app.use("/user",userRoute);
app.use("/",staticRoute);

app.get("/url/:shortId",async(req,res)=>{
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
