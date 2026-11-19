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
  document.addEventListener("rtb:cookie-settings",openSettings);
  return ()=>{document.removeEventListener("click",clickHandler);document.removeEventListener("rtb:cookie-settings",openSettings);};
 },[]);
 const save=maps=>{
  const record={version:1,necessary:true,maps,updatedAt:new Date().toISOString()};
  try{window.localStorage.setItem(CONSENT_KEY,JSON.stringify(record));}catch{}
  setMapsAllowed(maps);applyMapConsent(maps);setManageOpen(false);setVisible(false);
 };
 const accept=()=>save(true),reject=()=>save(false);
 return <div className="cookie-consent-root">
  <section className="cookie-banner" aria-labelledby="cookie-banner-title" aria-describedby="cookie-banner-copy" hidden={!visible}>
   <div className="cookie-banner-copy">
    <p className="cookie-eyebrow">YOUR PRIVACY</p><h2 id="cookie-banner-title">Your cookie choices</h2>
    <p id="cookie-banner-copy">We use essential browser storage to remember your choice. Optional Google Maps content loads only if you allow it. Read our <a href="/cookie-policy">Cookie Policy</a>.</p>
   </div>
   <div className="cookie-banner-actions">
    <button type="button" className="cookie-button cookie-accept" onClick={accept}>Accept</button>
    <button type="button" className="cookie-button cookie-reject" onClick={reject}>Reject</button>
    <button type="button" className="cookie-button cookie-manage" onClick={()=>setManageOpen(true)}>Manage</button>
   </div>
  </section>
  {manageOpen&&<div className="cookie-modal-backdrop" role="presentation" onMouseDown={e=>{if(e.target===e.currentTarget)setManageOpen(false);}}>
   <section className="cookie-modal" role="dialog" aria-modal="true" aria-labelledby="cookie-modal-title">
    <button type="button" className="cookie-modal-close" aria-label="Close cookie settings" onClick={()=>setManageOpen(false)}>x</button>
    <p className="cookie-eyebrow">PRIVACY SETTINGS</p><h2 id="cookie-modal-title">Manage cookie choices</h2>
    <p>Essential storage remembers your selection and is always active. Optional map content is off unless you choose to enable it.</p>
    <div className="cookie-choice-row"><div><strong>Essential storage</strong><p>Remembers your cookie choice.</p></div><span className="cookie-always-on">Always on</span></div>
    <label className="cookie-choice-row cookie-toggle-row"><div><strong>Google Maps content</strong><p>Loads the map for 2 Argyll Road and may allow Google to use cookies or similar technologies.</p></div><input type="checkbox" checked={mapsAllowed} onChange={e=>setMapsAllowed(e.target.checked)}/></label>
    <div className="cookie-modal-actions"><button type="button" className="cookie-button cookie-accept" onClick={()=>save(mapsAllowed)}>Save choices</button><button type="button" className="cookie-button cookie-reject" onClick={reject}>Reject optional</button></div>
    <p className="cookie-modal-policy"><a href="/cookie-policy">Read the Cookie Policy</a></p>
   </section>
  </div>}
 </div>;
}
