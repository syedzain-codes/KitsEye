import mongoose from 'mongoose';
const schema=new mongoose.Schema({actor:{type:mongoose.Schema.Types.ObjectId,ref:'User'},action:{type:String,required:true},targetType:String,targetId:String,metadata:mongoose.Schema.Types.Mixed,ip:String},{timestamps:true});
schema.index({createdAt:-1});
export default mongoose.model('AuditLog',schema);
