import {initialState,State} from './data';
const KEY='rasavatt.website.v1';
// Replace this adapter with database/API calls when your backend is ready.
export const customerService={
 load():State { try { const raw=localStorage.getItem(KEY); return raw?{...initialState,...JSON.parse(raw)}:structuredClone(initialState); } catch{return structuredClone(initialState);} },
 save(state:State) { localStorage.setItem(KEY,JSON.stringify(state)); },
};
