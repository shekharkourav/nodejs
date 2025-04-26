const path=require("path");
const express=require("express");
const mongoose=require("mongoose");

const userRoute=require("./routes/user");

const app=express();

mongoose.connect("mongodb://127.0.0.1:27017/blogify")
.then(()=>console.log("mongodb connected"))
.catch((err)=> console.log("mongo error",err));

app.set('view engine','ejs')
app.set('views',path.resolve("./views"))

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.get("/",(req,res)=>{
    res.render("home");
});

app.use("/user",userRoute);

app.listen(8000,()=>{
    console.log("server strted");
})