import jwt from 'jsonwebtoken';
import User from '../models/User.js';
const tokenFor=u=>jwt.sign({id:u._id,role:u.role},process.env.JWT_SECRET,{expiresIn:process.env.JWT_EXPIRES_IN||'1d'});
const safe=u=>({_id:u._id,name:u.name,email:u.email,role:u.role,department:u.department,studentId:u.studentId});
export async function register(req,res){const {name,email,password,studentId}=req.body;if(!name||!email||!password||password.length<8)return res.status(400).json({message:'Name, email and password (8+ characters) are required'});const exists=await User.findOne({email:email.toLowerCase()});if(exists)return res.status(409).json({message:'Email is already registered'});const user=await User.create({name,email,password,studentId,role:'student'});res.status(201).json({token:tokenFor(user),user:safe(user)});}
export async function login(req,res){const {email,password}=req.body;const user=await User.findOne({email:email?.toLowerCase()}).select('+password').populate('department','name code');if(!user||!user.active||!(await user.comparePassword(password||'')))return res.status(401).json({message:'Invalid email or password'});res.json({token:tokenFor(user),user:safe(user)});}
export async function me(req,res){res.json({user:safe(req.user)});}
