import {z} from 'zod';
const short=z.string().max(500),text=z.string().max(20000),asset=z.string().max(500000),id=z.string().max(200);
const address=z.object({id,name:short,phone:short,address:short,city:short,state:short,pincode:short,isDefault:z.boolean()});
const item=z.object({productId:id,size:short,color:short,quantity:z.number().int().min(1).max(99)});
const boardItem=z.object({id,type:short,text, color:short.optional(),image:asset.optional(),x:z.number(),y:z.number()});
export const workspaceSchema=z.object({
 user:z.object({name:short,email:short,phone:short,photo:asset.optional()}).nullable(),
 wishlist:z.array(id).max(500),cart:z.array(item).max(100),
 brief:z.record(z.string(),z.union([text,z.array(asset).max(20)])),
 preferences:z.record(z.string(),z.array(short).max(30)),
 addresses:z.array(address).max(50),measurements:z.array(z.object({id,name:short,unit:short,group:short.optional(),gender:short.optional(),values:z.record(z.string(),short)})).max(100),
 conversations:z.record(z.string(),z.array(z.object({id,text,mine:z.boolean(),time:short,attachment:asset.optional()})).max(1000)),
 orders:z.array(z.object({id,name:short,total:z.number().nonnegative(),status:short,stage:z.number().int().min(0).max(5),date:short,image:z.number(),items:z.array(item),address:address.optional()})).max(500),
 reviews:z.array(z.object({id,rating:z.number().int().min(1).max(5),text,orderId:id,date:short,author:short.optional(),photos:z.array(asset).max(4).optional(),scores:z.record(z.string(),z.number().min(1).max(5)).optional(),tip:z.number().nonnegative().optional()})).max(500),
 boards:z.array(z.object({id,name:short,items:z.array(boardItem).max(1000)})).max(100),
 versions:z.array(z.object({id,date:short,note:text,items:z.array(boardItem).max(1000)})).max(100),
 notifications:z.array(z.object({id,title:short,detail:text,category:short,href:short,read:z.boolean()})).max(1000),
 dark:z.boolean(),payments:z.array(z.object({id,label:short,isDefault:z.boolean()})).max(50),settings:z.record(z.string(),z.boolean()),recentSearches:z.array(short).max(30),tickets:z.array(z.object({id,text})).max(1000),approved:z.boolean(),
});
