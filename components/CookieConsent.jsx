"use client";
import {useEffect,useState} from "react";

const CONSENT_KEY="rtb_cookie_consent_v1";
function readConsent(){
 try{
  const value=JSON.parse(window.localStorage.getItem(CONSENT_KEY)||"null");
  if(value&&value.version===1&&typeof value.maps==="boolean")return value;
 }catch{}
 return null;
}
function applyMapConsent(allowed){
 const frame=document.querySelector("[data-map-iframe]");
 const placeholder=document.querySelector("[data-map-placeholder]");
 if(frame){
  if(allowed&&frame.dataset.src&&frame.getAttribute("src")==="about:blank")frame.setAttribute("src",frame.dataset.src.replaceAll("&amp;","&"));
  if(!allowed&&frame.getAttribute("src")&&frame.getAttribute("src")!=="about:blank")frame.setAttribute("src","about:blank");
 }
 if(placeholder)placeholder.hidden=Boolean(allowed);
}
export default function CookieConsent(){
 const [visible,setVisible]=useState(true);
 const [manageOpen,setManageOpen]=useState(false);
 const [mapsAllowed,setMapsAllowed]=useState(false);
 useEffect(()=>{
  const saved=readConsent();
  if(saved){setVisible(false);setMapsAllowed(saved.maps);applyMapConsent(saved.maps);}
  const openSettings=()=>{setVisible(true);setManageOpen(true);};
  const clickHandler=event=>{
   const settings=event.target.closest("[data-cookie-settings]");
   const mapSettings=event.target.closest("[data-cookie-map-settings]");
   if(settings||mapSettings){event.preventDefault();openSettings();}
  };
  document.addEventListener("click",clickHandler);
  document¶»§q«^