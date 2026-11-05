import mongoose from 'mongoose';
const schema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},title:{type:String,required:true},message:{type:String,required:true},complaint:{type:mongoose.Schema.Types.ObjectId,ref:'Complaint'},read:{type:Boolean,default:false},createdAt:{type:Date,default:Date.now}},{timestamps:true});
export default mongoose.model('Notification',schema);
