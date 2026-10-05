export interface Product { id:string; name:string; category:string; price:number; fabric:string; color:string; image:number; rating:number }
export interface Designer { id:string; name:string; specialty:string; location:string; price:number; rating:number; image:number }
export interface CartItem { productId:string; size:string; color:string; quantity:number }
export interface Address { id:string; name:string; phone:string; address:string; city:string; state:string; pincode:string; isDefault:boolean }
export interface MeasurementProfile { id:string; name:string; unit:string; values:Record<string,string> }
export interface Message { id:string; text:string; mine:boolean; time:string; attachment?:string }
export interface Order { id:string; name:string; total:number; status:string; stage:number; date:string; image:number; items:CartItem[]; address?:Address }
export interface Review { id:string; rating:number; text:string; orderId:string; date:string }
export interface BoardItem { id:string; type:string; text:string; color?:string; image?:string; x:number; y:number }
export interface Moodboard { id:string; name:string; items:BoardItem[] }
export interface DesignVersion { id:string; date:string; note:string; items:BoardItem[] }
export interface DesignBrief { [key:string]:string|string[] }
export interface User { name:string; email:string; phone:string; photo?:string }
export interface Notification { id:string; title:string; detail:string; category:string; href:string; read:boolean }
export interface State { user:User|null; wishlist:string[]; cart:CartItem[]; brief:DesignBrief; preferences:Record<string,string[]>; addresses:Address[]; measurements:MeasurementProfile[]; conversations:Record<string,Message[]>; orders:Order[]; reviews:Review[]; boards:Moodboard[]; versions:DesignVersion[]; notifications:Notification[]; dark:boolean; payments:{id:string;label:string;isDefault:boolean}[]; settings:Record<string,boolean>; recentSearches:string[]; tickets:{id:string;text:string}[]; approved:boolean }
export const products:Product[] = [
 {id:'gulab-lehenga',name:'Gulab Hand-Embroidered Lehenga',category:'Lehengas',price:24900,fabric:'Silk',color:'Rose',image:4,rating:4.9},
 {id:'noor-saree',name:'Noor Silk Saree',category:'Sarees',price:8900,fabric:'Silk',color:'Peach',image:2,rating:4.8},
 {id:'zari-blouse',name:'Zari Heritage Blouse',category:'Blouses',price:3900,fabric:'Silk',color:'Rose',image:6,rating:4.9},
 {id:'gulmohar-dupatta',name:'Gulmohar Organza Dupatta',category:'Dupattas',price:2900,fabric:'Organza',color:'Peach',image:5,rating:4.7},
 {id:'meher-kurta',name:'Meher Festive Kurta Set',category:'Kurtas',price:5900,fabric:'Cotton',color:'Ivory',image:3,rating:4.8},
 {id:'tara-dress',name:'Tara Occasion Dress',category:'Dresses',price:7900,fabric:'Chiffon',color:'Rose',image:8,rating:4.8},
 {id:'aarav-sherwani',name:'Aarav Bespoke Sherwani',category:'Men’s',price:18900,fabric:'Silk',color:'Ivory',image:1,rating:4.9},
 {id:'mogra-accessory',name:'Mogra Embroidered Potli',category:'Accessories',price:1900,fabric:'Velvet',color:'Gold',image:7,rating:4.7},
];
export const designers:Designer[] = [
 {id:'ananya',name:'Ananya Couture',specialty:'Bridal · Couture · Embroidery',location:'Hyderabad',price:12000,rating:4.9,image:3},
 {id:'meera',name:'Studio Meera',specialty:'Modern · Minimal · Silk',location:'Bengaluru',price:5000,rating:4.8,image:2},
 {id:'arjun',name:'Arjun Atelier',specialty:'Menswear · Traditional · Bespoke',location:'Mumbai',price:8000,rating:4.9,image:6},
 {id:'isha',name:'Isha Threads',specialty:'Festive · Indo-Western · Cotton',location:'Delhi',price:3500,rating:4.7,image:4},
];
export const fabrics=['Silk','Cotton','Linen','Velvet','Chiffon','Georgette'];
export const colors:Record<string,string>={Ivory:'#eee3d0',Rose:'#b96b70',Terracotta:'#b9654a',Sage:'#7d8b78',Gold:'#c6a66b',Midnight:'#303545',Lilac:'#c6b2cc',Peach:'#edb79e'};
export const occasions=['Wedding','Engagement','Party','Office','Festival','Casual','Date Night','Family Function'];
export const styles=['Traditional','Modern','Minimal','Elegant','Luxury','Indo-Western','Casual','Festive'];
export const stages=['Design','Fabric','Stitching','Quality','Shipping','Delivered'];
export const money=(v:number)=>new Intl.NumberFormat('en-IN',{style:'currency',currency:'INR',maximumFractionDigits:0}).format(v);
export const uid=()=>globalThis.crypto?.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`;
export const initialState:State={user:null,wishlist:[],cart:[],brief:{occasion:'Wedding',outfit:'Lehenga',fabric:'Silk',colors:['Rose'],budget:'25000',designer:'ananya'},preferences:{},addresses:[],measurements:[],conversations:{},orders:[],reviews:[],boards:[{id:'first-board',name:'My wedding inspiration',items:[]}],versions:[],notifications:[{id:'welcome',title:'Your story starts here',detail:'Explore designers and find your next favourite outfit.',category:'Offers',href:'/discover',read:false}],dark:false,payments:[],settings:{Orders:true,Messages:true,Payments:true,Offers:false},recentSearches:[],tickets:[],approved:false};
