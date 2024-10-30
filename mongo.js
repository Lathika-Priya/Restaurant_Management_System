const mongoose=require("mongoose")
const bcrypt = require('bcrypt');

mongoose.connect("mongodb://localhost:27017/restaurantHub")
.then(()=>{
    console.log('mongoose connected');
})
.catch((e)=>{
    console.log('failed');
})

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email: { type: String, required: true, unique: true },
    mobile: { type: String, required: true, unique: true },


})

userSchema.pre('save', async function(next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Method to compare password
userSchema.methods.comparePassword = function(password) {
    return bcrypt.compare(password, this.password);
};

const LogInCollection=new mongoose.model('userdetails',userSchema)

module.exports=LogInCollection