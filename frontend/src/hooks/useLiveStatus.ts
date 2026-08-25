import { useEffect, useState } from "react";
import { defaultStatus } from "../data/defaultStatus";
import type { PortfolioStatus } from "../types/status";

const enabled = import.meta.env.VITE_ENABLE_LIVE_STATUS === "true";
const apiBaseUrl = (import.meta.env.VITE_API_BASE_URL || "").replace(/\/$/, "");
const valid = (value:unknown): value is PortfolioStatus => { if(!value||typeof value!=="object") return false; const s=value as Record<string,unknown>; const b=s.currently_building as Record<string,unknown>|undefined; return typeof s.engineer==="string"&&typeof s.location==="string"&&Array.isArray(s.focus)&&s.focus.every(x=>typeof x==="string")&&typeof s.availability==="boolean"&&typeof s.updated_at==="string"&&!!b&&typeof b.name==="string"&&typeof b.description==="string" };
const request = async(signal:AbortSignal) => { const response=await fetch(`${apiBaseUrl}/api/status`,{signal}); if(!response.ok) throw new Error(); const data:unknown=await response.json(); if(!valid(data)) throw new Error(); return data };

export const useLiveStatus = () => {
  const [status,setStatus]=useState(defaultStatus); const [loading,setLoading]=useState(enabled);
  useEffect(()=>{ if(!enabled) return; const controller=new AbortController(); const timeout=window.setTimeout(()=>controller.abort(),3000); const load=async()=>{ try { let data:PortfolioStatus; try{data=await request(controller.signal)}catch{data=await request(controller.signal)} setStatus(data) }catch{setStatus(defaultStatus)}finally{window.clearTimeout(timeout);setLoading(false)}}; void load(); return()=>{window.clearTimeout(timeout);controller.abort()} },[]);
  return {status,loading};
};
