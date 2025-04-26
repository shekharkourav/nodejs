const { error } = require("console");
const {createHmac,randomBytes}=require("crypto");
const {Schema,model}=require("mongoose");

const userSchema=new Schema({
    fullName:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    salt:{
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    profileImage:{
        type:String,
        default:"/images/User-Avatar.png",
    },
    role:{
        type:String,
        enum:["USER","ADMIN"],
        default:"USER",
    },
},{timestamps:true}
);

userSchema.pre("save",function(next){
    const user=this;

    if(!user.isModified("password")) return;

    const salt="someRandomString";
    console.log(salt);
    const hashedPassword=createHmac("sha256",salt).update(user.password).digest("hex");

    this.salt=salt;
    this.password=hashedPassword;

    next();
});

userSchema.static("matchPassword",async function(email,password){
    const user= await this.findOne({email});
    if(!user) throw new error('user not found!');

    const salt=user.salt;
    const hashedPassword=user.password;

    const userProvidedHash=createHmac("sha256",salt).update(user.password).digest("hex");
    if(hashedPassword===userProvidedHash) throw new error('Incorrect Password');
    //return hashedPassword===userProvidedHash;
    return user
})

const User=model('user',userSchema);

module.exports=User;