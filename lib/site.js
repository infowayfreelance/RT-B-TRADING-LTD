import {readFileSync} from "node:fs";
import {join} from "node:path";
export const services=[
["building-materials","Building Materials","The essentials behind every build. Ask about materials for your next project."],
["new-builds","New Builds","Fresh ideas, from the ground up."],
["extensions","Extensions","Making room for what matters."],
["loft-conversions","Loft Conversions","New possibilities in existing spaces."],
["structural-works","Structural Works","Where strength meets precision."],
["groundworks","Groundworks","Strong beginnings for what comes next."]
];
export const routes=["about","services","materials","approach","contact","faqs",...services.map(x=>"services/"+x[0])];
const nav=[["Home","/"],["About","/about"],["Our Services","/services"],["Materials","/materials"],["Our Approach","/approach"],["Contact","/contact"]];
const raw=()=>readFileSync(join(process.cwd(),"site-original.html"),"utf8").match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]||"";
const assetFix=s=>s.replace(/<script\b[^>]*\bsrc=["'](?:\.\/)?app\.js["'][^>]*>\s*<\/script>/gi,"").replace(/(src|href)=(["'])assets\//gi,"$1=$2/assets/");
const safe=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function navFix(s,path){
 const links=nav.map(([name,url])=>'<a href="'+url+'"'+(url===path||(url==="/services"&&path.startsWith("/services/"))?' aria-current="page"':'')+'>'+name+'</a>').join("");
 return s.replace(/(<nav\b[^>]*class="desktop-nav"[^>]*>)[\s\S]*?(<\/nav>)/i,(_,a,b)=>a+links+b)
 .replace(/(<nav\b[^>]*class="mobile-nav"[^>]*>)[\s\S]*?(<\/nav>)/i,(_,a,b)=>a+links+b)
 .replace(/(<div\b[^>]*class="footer-nav"[^>]*>)[\s\S]*?(<\/div>)/i,(_,a,b)=>a+links+b)
 .replace(/(<a\b[^>]*class="brand(?: footer-brand)?"[^>]*?)href="#top"/gi,'$1href="/"');
}
function cardLinks(s){
 let n=0;return s.replace(/<article\b[^>]*class="service-card[^>]*>[\s\S]*?<\/article>/gi,item=>{
 const route=services[n++]?.[0];return route?item.replace(/href="#(?:contact|materials)"/i,'href="'+(route==="building-materials"?"/materials":"/services/"+route)+'"'):item;
 });
}
function section(s,id){
 return [...s.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/gi)].find(m=>m[0].includes('id="'+id+'"'))?.[0]||"";
}
const faq=s=>[...s.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/gi)].find(m=>m[0].includes('class="faqs '))?.[0]||"";
const intro=(title,label,description="")=>'<section class="subpage-intro"><div class="shell"><div class="section-label inverted">RT&amp;B / '+safe(label)+'</div><h1>'+safe(title)+'<span class="period">.</span></h1>'+(description?'<p>'+safe(description)+'</p>':'')+'<a class="subpage-back" href="/">← BACK TO HOME</a></div></section>';
const cta=()=>'<section class="subpage-cta"><div class="shell subpage-cta-inner"><div><div class="section-label inverted">START A CONVERSATION</div><h2>LET\'S BUILD<br/><span>SOMETHING GOOD.</span></h2><p>Have a project in mind or a building materials list? Tell us what you need.</p></div><a class="btn btn-accent" href="/contact">GET IN TOUCH <span>↗</span></a></div></section>';
function detail(s){
 return intro(s[1].toUpperCase(),"PROJECT AREAS",s[2])+'<section class="subpage-detail section-pad"><div class="shell"><div class="section-label">YOUR ENQUIRY / '+safe(s[1].toUpperCase())+'</div><div class="subpage-detail-grid"><h2>LET\'S DISCUSS<br/>YOUR NEXT STEP<span class="period">.</span></h2><div><p>'+safe(s[2])+' Tell us about the work you are considering and the details you already know. We can discuss your requirements and the next step.</p><h3>WHAT TO SHARE</h3><ul><li>The type of project you have in mind</li><li>Where the project is based</li><li>Any plans, measurements or material requirements you already have</li></ul><a href="/contact" class="btn btn-accent">MAKE AN ENQUIRY <span>↗</span></a></div></div></div></section>'+cta();
}
export function renderHomepage(){return navFix(cardLinks(assetFix(raw())),"/");}
export function renderPage(slugs){
 const path="/"+slugs.join("/"), body=assetFix(raw());
 let content;
 switch(path){
 case "/about":content=intro("ABOUT RT&B","THE RT&B MINDSET")+section(body,"about")+section(body,"approach")+cta();break;
 case "/services":content=intro("OUR SERVICES","WHAT WE DO","Explore construction areas and building material enquiries.")+cardLinks(section(body,"services"))+cta();break;
 case "/materials":content=intro("BUILDING MATERIALS","MATERIAL ENQUIRIES")+section(body,"materials")+cta();break;
 case "/approach":content=intro("OUR APPROACH","HOW WE WORK")+section(body,"approach")+cta();break;
 case "/contact":content=intro("CONTACT US","THE NEXT STEP")+section(body,"contact")+faq(body);break;
 case "/faqs":content=intro("QUESTIONS & ANSWERS","GOOD TO KNOW")+faq(body)+cta();break;
 default:content=services.find(x=>path==="/services/"+x[0]);content=content?detail(content):null;
 }
 if(!content)return null;
 const top=body.slice(0,body.search(/<main\b/i)),foot=body.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/i)?.[0]||"";
 return navFix((top+'<main id="main">'+content+'</main>'+foot+'<div class="toast" id="toast" role="status" aria-live="polite"></div>').replace(/href="#contact"/g,'href="/contact"'),path);
}