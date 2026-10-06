import {env} from 'cloudflare:workers';
import {getChatGPTUser} from '@/app/chatgpt-auth';
export async function POST(request:Request){
 if(request.headers.get('origin')!==new URL(request.url).origin)return Response.json({error:'Invalid origin'},{status:403});
 const user=await getChatGPTUser();if(!user)return Response.json({error:'Sign in required'},{status:401});
 if(!env.BUCKET)return Response.json({error:'Upload storage unavailable'},{status:503});
 try{const form=await request.formData(),file=form.get('file');if(!(file instanceof File)||file.size>3*1024*1024)return Response.json({error:'Choose a file smaller than 3 MB'},{status:400});if(!['image/jpeg','image/png','image/webp','image/gif','application/pdf','audio/webm'].includes(file.type))return Response.json({error:'Unsupported file type'},{status:400});const key=encodeURIComponent(user.userId)+'/'+crypto.randomUUID();await env.BUCKET.put(key,await file.arrayBuffer(),{httpMetadata:{contentType:file.type}});return Response.json({url:'/api/uploads/'+encodeURIComponent(key)})}catch(e){console.error('Upload failed',e);return Response.json({error:'Upload failed. Please retry.'},{status:503})}
}
