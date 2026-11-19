import {routes} from "../lib/site";
export default function sitemap(){
 const paths=["/",...routes.map(path=>"/"+path)],today=new Date("2026-11-19T00:00:00.000Z");
 return [...new Set(paths)].map(path=>({url:"https://rtbtradingltd.co.uk"+(path==="/" ? "/" : path),lastModified:today,changeFrequency:path==="/"?"weekly":"monthly",priority:path==="/" ? 1 : path==="/services"||path==="/contact" ? 0.9 : 0.7}));
}
