import AuditLog from '../models/AuditLog.js';
export function audit(req,action,targetType,targetId,metadata={}){return AuditLog.create({actor:req.user?._id,action,targetType,targetId:String(targetId||''),metadata,ip:req.ip});}
