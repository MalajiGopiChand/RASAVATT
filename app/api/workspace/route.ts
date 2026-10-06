import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
import {z} from 'zod';
import {workspaceSchema} from '@/lib/rasavatt/validation';
const requestSchema=z.object({state:workspaceSchema,revision:z.number().int().nonnegative()});
const json=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
export async function GET(){
 const user=await getChatGPTUser();if(!user)return json({error:'Sign in to save your studio.'},401);
 if(!env.DB)return json({error:'Your studio is temporarily unavailable.'},503);
 try{const row=await env.DB.prepare('SELECT payload, revision FROM customer_workspaces WHERE user_id = ?').bind(user.userId).first<{payload:string;revision:number}>();return json({state:row?JSON.parse(row.payload):null,revision:row?.revision||0,user:{name:user.fullName||user.displayName,email:user.email,phone:''}})}catch(e){console.error('Workspace load failed',e);return json({error:'Your saved studio could not be loaded. Please retry.'},503)}
}
export async function PUT(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin)return json({error:'Invalid origin.'},403);
 const user=await getChatGPTUser();if(!user)return json({error:'Sign in required.'},401);
 if(!env.DB)return json({error:'Storage unavailable.'},503);
 try{const raw=await request.text();if(raw.length>2000000)return json({error:'Your studio is too large. Remove unused images.'},413);const parsed=requestSchema.safeParse(JSON.parse(raw));if(!parsed.success)return json({error:'Invalid studio data.'},400);const {state,revision}=parsed.data;
 // User identity comes from the dispatcher, never from a client-submitted id.
 const payload=JSON.stringify(state),now=new Date().toISOString();
 if(revision===0){const r=await env.DB.prepare('INSERT OR IGNORE INTO customer_workspaces (user_id, payload, revision, updated_at) VALUES (?, ?, 1, ?)').bind(user.userId,payload,now).run();if(!r.meta.changes)return json({error:'Your studio changed in another tab. Reload before saving.'},409);return json({revision:1})}
 const r=await env.DB.prepare('UPDATE customer_workspaces SET payload = ?, revision = revision + 1, updated_at = ? WHERE user_id = ? AND revision = ?').bind(payload,now,user.userId,revision).run();if(!r.meta.changes)return json({error:'Your studio changed in another tab. Reload before saving.'},409);return json({revision:revision+1});
 }catch(e){console.error('Workspace save failed',e);return json({error:'Your changes could not be saved. Please retry.'},503)}
}
