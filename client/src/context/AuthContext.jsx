import{createContext,useContext,useEffect,useState}from'react';import api from'../services/api';
const AuthContext=createContext(null);
export function AuthProvider({children}){const[user,setUser]=useState(()=>{try{return JSON.parse(localStorage.getItem('kitseye_user'))}catch{return null}});const[token,setToken]=useState(()=>localStorage.getItem('kitseye_token'));const[ready,setReady]=useState(false);
useEffect(()=>{(async()=>{if(token){try{const{data}=await api.get('/auth/me');setUser(data.user);localStorage.setItem('kitseye_user',JSON.stringify(data.user));}catch{logout();}}setReady(true)})()},[]);
function login(data){localStorage.setItem('kitseye_token',data.token);localStorage.setItem('kitseye_user',JSON.stringify(data.user));setToken(data.token);setUser(data.user)}function logout(){localStorage.removeItem('kitseye_token');localStorage.removeItem('kitseye_user');setToken(null);setUser(null)}
return <AuthContext.Provider value={{user,token,ready,login,logout}}>{children}</AuthContext.Provider>}
export const useAuth=()=>useContext(AuthContext);
