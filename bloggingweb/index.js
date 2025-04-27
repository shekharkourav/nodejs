const path=require("path");
const express=require("express");
const mongoose=require("mongoose");
const cookieParser=require("cookie-parser");

const Blog=require("./models/blog");

const userRoute=require("./routes/user");
const blogRoute=require("./routes/blog");
const { checkForAuthenticationCookie } = require("./middlewares/authentication");
const { TokenExpiredError } = require("jsonwebtoken");

const app=express();

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(()=>console.log("mongodb connected"))
.catch((err)=> console.log("mongo error",err));

app.set('view engine','ejs')
app.set('views',path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(checkForAuthenticationCookie("token"));
app.use(express.static(path.resolve("./public")))


app.get("/",async (req,res)=>{
    const allBlogs=await Blog.find({});
    res.render("home",{
        user:req.user,
        blogs:allBlogs,
    });
});

app.use("/user",userRoute);
app.use("/blog",blogRoute);

app.listen(8000,()=>{
    console.log("server strted");
})