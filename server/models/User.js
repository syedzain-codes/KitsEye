import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
const userSchema=new mongoose.Schema({name:{type:String,required:true,trim:true,maxlength:80},email:{type:String,required:true,unique:true,lowercase:true,trim:true},password:{type:String,required:true,minlength:8,select:false},role:{type:String,enum:['student','admin','department'],default:'student'},department:{type:mongoose.Schema.Types.ObjectId,ref:'Department',default:null},studentId:{type:String,trim:true,default:null},active:{type:Boolean,default:true}}, {timestamps:true});
userSchema.pre('save',async function(){if(this.isModified('password'))this.password=await bcrypt.hash(this.password,12);});
userSchema.methods.comparePassword=function(password){return bcrypt.compare(password,this.password);};
export default mongoose.model('User',userSchema);
