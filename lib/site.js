import {readFileSync} from "node:fs";
import {join} from "node:path";

export const SITE_URL="https://rtbtradingltd.co.uk";
export const OG_IMAGE=SITE_URL+"/brand/og-home.jpg";
export const services=[
 ["building-materials","Building Materials","The essentials behind every build. Ask about materials for your next project."],
 ["new-builds","New Builds","Fresh ideas, from the ground up."],
 ["extensions","Extensions","Making room for what matters."],
 ["loft-conversions","Loft Conversions","New possibilities in existing spaces."],
 ["structural-works","Structural Works","Where strength meets precision."],
 ["groundworks","Groundworks","Strong beginnings for what comes next."]
];
export const routes=["about","services","materials","approach","contact","faqs",...services.map(x=>"services/"+x[0]),"privacy-policy","terms-and-conditions","cookie-policy"];
const nav=[["Home","/"],["About","/about"],["Our Services","/services"],["Materials","/materials"],["Our Approach","/approach"],["Contact","/contact"]];
const seo={
 "/":{title:"RT&B Trading Ltd | Construction & Building Materials in Stoke-on-Trent",description:"RT&B Trading Ltd supports construction projects and building material enquiries in Stoke-on-Trent. Explore our services and get in touch."},
 "/about":{title:"About RT&B Trading Ltd | Stoke-on-Trent",description:"Learn about RT&B Trading Ltd, our construction focus and the practical approach behind our work in Stoke-on-Trent."},
 "/services":{title:"Construction Services |¶»§q«^