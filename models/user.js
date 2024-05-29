const mongoose=require('mongoose');
const MONGODB_URI= process.env.MONGODB_URL || 'mongodb://localhost:27017/notes'
const plm=require('passport-local-mongoose')

mongoose.connect(MONGODB_URI)

const userSchema=mongoose.Schema({
    username:String,
    fullname:String,
    password:String,
    notes:{
        type:Array,
        default:[]
    }
})

userSchema.plugin(plm);

module.exports=mongoose.model('user',userSchema)