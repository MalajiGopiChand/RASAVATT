import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
export async function GET(request:Request,{params}:{params:Promise<{key:string}>}){
 const user=await getChatGPTUser();if(!user)return new Response('Sign in required',{status:401});const {key}=await params;
 if(!key.startsWith(encodeURIComponent(user.userId)+'/'))return new Response('Not found',{status:404});
 if(!env.BUCKET)return new Response('Storage unavailable',{status:503});const object=await env.BUCKET.get(key);if(!object)return new Response('Not found',{status:404});const headers=new Headers({'Cache-Control':'private, max-age=3600','X-Content-Type-Options':'nosniff'});object.writeHttpMetadata(headers);return new Response(object.body,{headers});
}
