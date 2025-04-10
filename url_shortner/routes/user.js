const express=require("express");
const {handleUserSignup,handleUserLogin}=require("../controllers/user");

const route=express.Router();

route.post("/",handleUserSignup);
route.post("/login",handleUserLogin);

module.exports=route;