import Notification from '../models/Notification.js';
import User from '../models/User.js';
export async function notify(user,title,message,complaint){if(user)await Notification.create({user,title,message,complaint});}
export async function notifyRole(role,title,message,complaint,department=null){const q={role,active:true};if(department)q.department=department;const users=await User.find(q).select('_id');if(users.length)await Notification.insertMany(users.map(u=>({user:u._id,title,message,complaint})));}
