'use client';
import {createContext,useContext,Dispatch,SetStateAction} from 'react';
import {State} from '@/lib/rasavatt/data';
export interface SiteContext {state:State;setState:Dispatch<SetStateAction<State>>;go:(path:string)=>void;path:string;toast:(message:string)=>void}
export const Context=createContext<SiteContext>(null!);
export const useSite=()=>useContext(Context);
