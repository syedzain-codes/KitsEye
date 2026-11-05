import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';
import fs from 'node:fs';
const dir=path.resolve(process.env.UPLOAD_DIR||'uploads');fs.mkdirSync(dir,{recursive:true});
const allowed=new Set(['image/jpeg','image/png','image/webp','application/pdf']);
const storage=multer.diskStorage({destination:(req,file,cb)=>cb(null,dir),filename:(req,file,cb)=>cb(null,`${crypto.randomUUID()}${path.extname(file.originalname).toLowerCase()}`)});
export const upload=multer({storage,limits:{fileSize:5*1024*1024,files:5},fileFilter:(req,file,cb)=>cb(allowed.has(file.mimetype)?null:new Error('Only JPG, PNG, WEBP and PDF files are allowed'),allowed.has(file.mimetype))});
export function fileMeta(files,kind='evidence'){return (files||[]).map(f=>({filename:f.filename,originalName:path.basename(f.originalname).replace(/[\\/]/g,''),mimetype:f.mimetype,size:f.size,kind}));}
