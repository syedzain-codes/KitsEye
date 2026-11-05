import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,unique:true,trim:true},code:{type:String,required:true,unique:true,uppercase:true},description:String,active:{type:Boolean,default:true}}, {timestamps:true});
export default mongoose.model('Department',schema);
