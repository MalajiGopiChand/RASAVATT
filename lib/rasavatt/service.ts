import {initialState,State,User,products} from './data';
const KEY='rasavatt.website.v1';
let cloud=false,revision=0;
let pending:Promise<void>=Promise.resolve();
const normalize=(value:Partial<State>):State=>({...structuredClone(initialState),...value,cart:(value.cart||[]).filter(i=>products.some(p=>p.id===i.productId))});
export const customerService={
 async load():Promise<State> {
  const response=await fetch('/api/workspace',{cache:'no-store'});
  if(response.ok){const data=await response.json() as {state:Partial<State>|null;revision:number;user:User};cloud=true;revision=data.revision;const state=normalize(data.state||{});if(new URLSearchParams(location.search).get('connected')==='1')state.user=data.user;return state;}
  if(response.status!==401)throw Error('Your studio could not be loaded. Reload to try again.');
  cloud=false;try{const raw=localStorage.getItem(KEY);return normalize(raw?JSON.parse(raw):{});}catch{return normalize({});}
 },
 save(state:State):Promise<void> {
  if(!cloud){localStorage.setItem(KEY,JSON.stringify(state));return Promise.resolve();}
  pending=pending.catch(()=>undefined).then(async()=>{const response=await fetch('/api/workspace',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({state,revision})});const data=await response.json() as {revision:number;error?:string};if(!response.ok)throw Error(data.error||'Your changes could not be saved.');revision=data.revision;});
  return pending;
 },
 async upload(file:File):Promise<string>{if(cloud){const form=new FormData();form.append('file',file);const r=await fetch('/api/uploads',{method:'POST',body:form});const data=await r.json() as {url:string;error?:string};if(!r.ok)throw Error(data.error||'Upload failed');return data.url;}return new Promise((resolve,reject)=>{const reader=new FileReader();reader.onload=()=>resolve(String(reader.result));reader.onerror=()=>reject(Error('Could not read this file'));reader.readAsDataURL(file);});},
 isCloud(){return cloud;},
};

