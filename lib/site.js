import {readFileSync} from "node:fs";
import {join} from "node:path";

export const SITE_URL="https://rtbtradingltd.co.uk";
export const OG_IMAGE="https://images.unsplash.com/photo-1778438387124-b304a43a710b?auto=format&fit=crop&w=1200&q=80";
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
 "/services":{title:"Construction Services | RT&B Trading Ltd",description:"Explore RT&B Trading Ltd services, including new builds, extensions, loft conversions, structural works and groundworks."},
 "/materials":{title:"Building Materials | RT&B Trading Ltd Stoke-on-Trent",description:"Discuss building material requirements for your project with RT&B Trading Ltd in Stoke-on-Trent."},
 "/approach":{title:"Our Approach | RT&B Trading Ltd",description:"Discover the RT&B Trading Ltd approach to construction projects, clear communication and practical planning."},
 "/contact":{title:"Contact RT&B Trading Ltd | Stoke-on-Trent",description:"Contact RT&B Trading Ltd about a construction project or building materials enquiry. Find us at 2 Argyll Road, Stoke-on-Trent, ST3 4RB."},
 "/faqs":{title:"FAQs | RT&B Trading Ltd",description:"Find answers to common questions about contacting RT&B Trading Ltd and making a construction or building materials enquiry."},
 "/privacy-policy":{title:"Privacy Policy | RT&B Trading Ltd",description:"Read how RT&B Trading Ltd handles personal information under the UK GDPR and Data Protection Act 2018."},
 "/terms-and-conditions":{title:"Terms and Conditions | RT&B Trading Ltd",description:"Read the website terms and conditions for RT&B Trading Ltd, including information about enquiries, content and liability."},
 "/cookie-policy":{title:"Cookie Policy | RT&B Trading Ltd",description:"Learn how RT&B Trading Ltd uses essential storage and optional Google Maps content, and how to manage your choices."}
};
for(const [slug,name] of services){
 const label=slug==="building-materials"?"Building Materials Services":name;
 const desc=slug==="building-materials"?"Explore building materials for construction projects with RT&B Trading Ltd in Stoke-on-Trent.":"Learn about "+name.toLowerCase()+" with RT&B Trading Ltd in Stoke-on-Trent.";
 seo["/services/"+slug]={title:label+" | RT&B Trading Ltd Stoke-on-Trent",description:desc+" Discuss your project requirements."};
}
export function buildMetadata(path){
 const data=seo[path]||{title:"RT&B Trading Ltd | Stoke-on-Trent",description:"Contact RT&B Trading Ltd in Stoke-on-Trent about construction projects and building materials."};
 const canonical=path==="/" ? SITE_URL+"/" : SITE_URL+path;
 return {
  title:data.title,description:data.description,alternates:{canonical},robots:{index:true,follow:true},
  openGraph:{type:"website",url:canonical,siteName:"RT&B Trading Ltd",locale:"en_GB",title:data.title,description:data.description,images:[{url:OG_IMAGE,width:1200,height:630,alt:"Construction project with scaffolding"}]},
  twitter:{card:"summary_large_image",title:data.title,description:data.description,images:[OG_IMAGE]}
 };
}
function raw(){
 let html=readFileSync(join(process.cwd(),"site-original.html"),"utf8").match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1]||"";
 html=html.replace(/<div class="contact-email">[\s\S]*?<\/div>\s*<p class="email-note">[\s\S]*?<\/p>/i,'<div class="contact-email"><a href="mailto:sales@rtbtradingltd.co.uk">sales@rtbtradingltd.co.uk</a></div>');
 const map='<div class="map-consent-shell"><iframe class="contact-map" data-map-iframe src="about:blank" data-src="https://www.google.com/maps?q=2+Argyll+Road,+Stoke-on-Trent,+ST3+4RB&amp;output=embed" title="Google Map showing RT&amp;B Trading Ltd at 2 Argyll Road, Stoke-on-Trent, ST3 4RB" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe><div class="map-consent-placeholder" data-map-placeholder><p>To protect your privacy, the map loads only after you allow optional map content.</p><button type="button" data-cookie-map-settings>Manage cookie settings</button></div></div>';
 html=html.replace(/<div class="map-graphic"[^>]*>[\s\S]*?<\/div>/i,map);
 html=html.replace(/<img\b([^>]*?)\balt=(["'])\s*\2([^>]*)>/gi,'<img$1alt="Architectural blueprint grid illustration"$3>');
 html=html.replace('alt="Architectural blueprint grid illustration" loading="lazy" aria-hidden="true"','alt="Architectural blueprint grid illustration" loading="lazy"');
 html=html.replace(/<a\b(?=[^>]*href=["'][^"']*(?:facebook\.com|instagram\.com|linkedin\.com|twitter\.com|x\.com|tiktok\.com|youtube\.com))[^>]*>[\s\S]*?<\/a>/gi,"");
 return html;
}
const assetFix=s=>s.replace(/<script\b[^>]*\bsrc=["'](?:\.\/)?app\.js["'][^>]*>\s*<\/script>/gi,"").replace(/(src|href)=(["'])assets\//gi,"$1=$2/assets/");
const safe=s=>s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
function navFix(s,path){
 const links=nav.map(([name,url])=>'<a href="'+url+'"'+(url===path||(url==="/services"&&path.startsWith("/services/"))?' aria-current="page"':'')+'>'+name+'</a>').join("");
 const legal='<div class="shell footer-legal"><div class="footer-legal-links"><a href="/privacy-policy">Privacy Policy</a><a href="/terms-and-conditions">Terms &amp; Conditions</a><a href="/cookie-policy">Cookie Policy</a></div><button type="button" class="cookie-settings-link" data-cookie-settings>Cookie settings</button></div>';
 return s.replace(/(<nav\b[^>]*class="desktop-nav"[^>]*>)[\s\S]*?(<\/nav>)/i,(_,a,b)=>a+links+b)
 .replace(/(<nav\b[^>]*class="mobile-nav"[^>]*>)[\s\S]*?(<\/nav>)/i,(_,a,b)=>a+links+b)
 .replace(/(<div\b[^>]*class="footer-nav"[^>]*>)[\s\S]*?(<\/div>)/i,(_,a,b)=>a+links+b)
 .replace(/(<a\b[^>]*class="brand(?: footer-brand)?"[^>]*?)href="#top"/gi,'$1href="/"')
 .replace(/<\/footer>/i,legal+"</footer>");
}
function cardLinks(s){
 let n=0;
 return s.replace(/<article\b[^>]*class="service-card[^>]*>[\s\S]*?<\/article>/gi,item=>{
  const route=services[n++]?.[0];
  return route?item.replace(/href="#(?:contact|materials)"/i,'href="'+(route==="building-materials"?"/materials":"/services/"+route)+'"'):item;
 });
}
function section(s,id){return [...s.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/gi)].find(m=>m[0].includes('id="'+id+'"'))?.[0]||"";}
const faq=s=>[...s.matchAll(/<section\b[^>]*>[\s\S]*?<\/section>/gi)].find(m=>m[0].includes('class="faqs '))?.[0]||"";
const intro=(title,label,description="")=>'<section class="subpage-intro"><div class="shell"><div class="section-label inverted">RT&amp;B / '+safe(label)+'</div><h1>'+safe(title)+'<span class="period">.</span></h1>'+(description?'<p>'+safe(description)+'</p>':'')+'<a class="subpage-back" href="/">BACK TO HOME</a></div></section>';
const cta=()=>'<section class="subpage-cta"><div class="shell subpage-cta-inner"><div><div class="section-label inverted">START A CONVERSATION</div><h2>LET\'S BUILD<br/><span>SOMETHING GOOD.</span></h2><p>Have a project in mind or a building materials list? Tell us what you need.</p></div><a class="btn btn-accent" href="/contact">GET IN TOUCH <span>↗</span></a></div></section>';
function detail(s){
 return intro(s[1].toUpperCase(),"PROJECT AREAS",s[2])+'<section class="subpage-detail section-pad"><div class="shell"><div class="section-label">YOUR ENQUIRY / '+safe(s[1].toUpperCase())+'</div><div class="subpage-detail-grid"><h2>LET\'S DISCUSS<br/>YOUR NEXT STEP<span class="period">.</span></h2><div><p>'+safe(s[2])+' Tell us about the work you are considering and the details you already know. We can discuss your requirements and the next step.</p><h3>WHAT TO SHARE</h3><ul><li>The type of project you have in mind</li><li>Where the project is based</li><li>Any plans, measurements or material requirements you already have</li></ul><a href="/contact" class="btn btn-accent">MAKE AN ENQUIRY <span>↗</span></a></div></div></div></section>'+cta();
}
const legalPages={
 "/privacy-policy":{title:"PRIVACY POLICY",label:"YOUR INFORMATION",body:[
 "<p><strong>Last updated: 19 November 2026</strong></p>",
 "<h2>1. Who we are</h2><p>RT&amp;B Trading Ltd is responsible for the personal information described in this policy. Our contact details are:</p><address>RT&amp;B Trading Ltd<br/>2 Argyll Road<br/>Stoke-on-Trent<br/>ST3 4RB<br/>United Kingdom</address><p>Email: <a href='mailto:sales@rtbtradingltd.co.uk'>sales@rtbtradingltd.co.uk</a></p>",
 "<h2>2. Personal information we may use</h2><p>Depending on how you interact with us, this may include your name, email address, the details of a project or materials enquiry, and the contents of messages you choose to send. Our website hosting and security systems may also create technical logs, such as IP address, browser and device information, request time and pages requested.</p>",
 "<h2>3. Why we use it and our lawful bases</h2><ul><li><strong>Responding to enquiries:</strong> to take steps at your request before entering into a contract, or where appropriate for our legitimate interests in handling and managing business enquiries.</li><li><strong>Website operation and security:</strong> to operate, maintain, protect and troubleshoot the website, where this is necessary for our legitimate interests and does not override your rights.</li><li><strong>Legal obligations:</strong> where we need to keep or disclose information to comply with a legal requirement.</li><li><strong>Optional map content:</strong> the Google Maps embed is not loaded unless you choose to allow it through the cookie settings. Your choice is recorded in your browser.</li></ul>",
 "<h2>4. Who may receive information</h2><p>We may share relevant information with website hosting, email, IT, security and professional service providers who help us operate our business, and with public authorities where we are legally required to do so. We do not sell personal information.</p>",
 "<h2>5. International transfers</h2><p>Some service providers may process information outside the United Kingdom. Where a restricted transfer of personal data takes place, we will use an applicable UK transfer mechanism and appropriate safeguards as required by data protection law.</p>",
 "<h2>6. How long we keep information</h2><p>We keep personal information only for as long as it is reasonably needed for the purpose for which it was collected, including handling an enquiry, maintaining appropriate business records, resolving disputes and meeting legal obligations. The period depends on the nature of the information and the circumstances.</p>",
 "<h2>7. Your data protection rights</h2><p>Subject to the conditions and exemptions in law, you may have the right to request access to your personal information, ask for inaccurate information to be corrected, request erasure or restriction, object to certain processing, request data portability, or withdraw consent where processing is based on consent. Withdrawing consent does not affect processing carried out before withdrawal.</p><p>To exercise a right, contact us at <a href='mailto:sales@rtbtradingltd.co.uk'>sales@rtbtradingltd.co.uk</a>. You also have the right to complain to the Information Commissioner's Office (ICO) at <a href='https://ico.org.uk/make-a-complaint/' target='_blank' rel='noopener noreferrer'>ico.org.uk</a>.</p>",
 "<h2>8. Third-party websites and services</h2><p>Our website may link to external websites or display optional third-party content such as Google Maps. Those providers operate under their own privacy information and terms. Please review their information before using those services.</p>",
 "<h2>9. Changes to this policy</h2><p>We may update this policy when our website or data practices change. The latest version will be published on this page with its updated date.</p>"
 ].join("")},
 "/terms-and-conditions":{title:"TERMS AND CONDITIONS",label:"WEBSITE TERMS",body:[
 "<p><strong>Last updated: 19 November 2026</strong></p>",
 "<h2>1. About these terms</h2><p>These terms apply to your use of the RT&amp;B Trading Ltd website. By using this website, you agree to use it lawfully and in line with these terms. If you do not agree, please do not use the website.</p>",
 "<h2>2. About the website information</h2><p>The website provides general information about RT&amp;B Trading Ltd, its areas of work and building materials enquiries. Website content is provided for general information only. It is not a quotation, offer, technical specification or promise that a particular service or material is available.</p>",
 "<h2>3. Enquiries and agreements</h2><p>Sending an enquiry does not create a contract or oblige RT&amp;B Trading Ltd to accept a project or supply request. Any quotation, scope, price, availability, delivery arrangements or work will be subject to confirmation and any separate written agreement between the relevant parties.</p>",
 "<h2>4. Accuracy and availability</h2><p>We take reasonable care when preparing website information, but do not guarantee that all content is complete, current or suitable for every project. Information may be updated or removed without notice. We do not guarantee that the website will always be available or free from errors or interruptions.</p>",
 "<h2>5. Intellectual property</h2><p>Unless stated otherwise, the text, design and other content on this website belong to RT&amp;B Trading Ltd or are used with permission. You may view and print pages for your personal or internal business reference. You must not reproduce, adapt, distribute or commercially exploit website content without prior permission, except where the law allows.</p>",
 "<h2>6. Acceptable use</h2><p>You must not misuse the website, attempt to gain unauthorised access to it or its systems, introduce malicious code, interfere with its operation, or use it in a way that breaks the law or infringes another person's rights.</p>",
 "<h2>7. External links and third-party services</h2><p>Links and embedded services are provided for convenience. We do not control third-party websites or services and are not responsible for their content, availability, privacy practices or terms. Their own terms apply when you use them.</p>",
 "<h2>8. Liability</h2><p>Nothing in these terms excludes or limits liability where it would be unlawful to do so, including liability for death or personal injury caused by negligence, fraud or fraudulent misrepresentation, or any statutory rights that cannot lawfully be excluded.</p><p>To the extent permitted by law, we are not liable for indirect or consequential loss, or for loss arising from reliance on general website information without obtaining project-specific advice or written confirmation. These terms do not affect your rights as a consumer.</p>",
 "<h2>9. Privacy and cookies</h2><p>Your use of personal information and optional website content is explained in our <a href='/privacy-policy'>Privacy Policy</a> and <a href='/cookie-policy'>Cookie Policy</a>.</p>",
 "<h2>10. Changes and governing law</h2><p>We may update these terms by publishing a revised version on this page. These terms are governed by the laws of England and Wales. The courts of England and Wales will have jurisdiction, subject to any mandatory rights you may have under applicable consumer law.</p>",
 "<h2>11. Contact</h2><p>Questions about these terms can be sent to <a href='mailto:sales@rtbtradingltd.co.uk'>sales@rtbtradingltd.co.uk</a> or by post to RT&amp;B Trading Ltd, 2 Argyll Road, Stoke-on-Trent, ST3 4RB, United Kingdom.</p>"
 ].join("")},
 "/cookie-policy":{title:"COOKIE POLICY",label:"COOKIES AND YOUR CHOICES",body:[
 "<p><strong>Last updated: 19 November 2026</strong></p>",
 "<h2>1. What this policy covers</h2><p>This policy explains how RT&amp;B Trading Ltd uses cookies and similar technologies on this website, and how you can control optional content. The rules in the Privacy and Electronic Communications Regulations (PECR) apply to storing information on, or accessing information from, your device. Where personal data is involved, the UK GDPR and Data Protection Act 2018 may also apply.</p>",
 "<h2>2. Essential storage</h2><p>We use your browser's local storage to remember the cookie choice you make on this website. This record stores whether you allowed optional map content and when you made the choice. It is used only to remember and apply your privacy preference. It is not an advertising or analytics cookie.</p>",
 "<h2>3. Optional Google Maps content</h2><p>The contact page includes an optional Google Maps embed for 2 Argyll Road, Stoke-on-Trent, ST3 4RB. The map is not requested from Google until you choose to allow map content using the cookie banner or cookie settings. If you reject optional content, the map remains unloaded and you can still use the directions link.</p><p>When the map is loaded, Google may receive technical information such as your IP address and browser/device details and may store or access cookies or similar technologies under its own control. Google's practices may change. See <a href='https://policies.google.com/privacy' target='_blank' rel='noopener noreferrer'>Google's Privacy Policy</a> and <a href='https://policies.google.com/technologies/cookies' target='_blank' rel='noopener noreferrer'>Google's information about cookies</a>.</p>",
 "<h2>4. Analytics and advertising</h2><p>RT&amp;B Trading Ltd does not currently intentionally deploy analytics or advertising cookies through this website. If this changes, this policy and the consent choices will be updated before any non-essential storage or access technology is used.</p>",
 "<h2>5. Your choices</h2><p>You can choose <strong>Accept</strong>, <strong>Reject</strong> or <strong>Manage</strong> in the cookie banner. You can change your choice at any time using the Cookie settings link in the footer. Optional map content is only loaded after you allow it. Rejecting optional content does not affect access to the rest of the website.</p><p>If you withdraw permission after loading the map, the website will stop loading the map on future visits. It cannot remove third-party cookies that Google may already have stored; you can remove those using your browser's privacy settings.</p>",
 "<h2>6. More information</h2><p>For details about how we handle personal information, see our <a href='/privacy-policy'>Privacy Policy</a>. For official guidance, visit the <a href='https://ico.org.uk/for-organisations/direct-marketing-and-privacy-and-electronic-communications/guide-to-pecr/cookies-and-similar-technologies/' target='_blank' rel='noopener noreferrer'>Information Commissioner's Office guidance on cookies and similar technologies</a>.</p>",
 "<h2>7. Contact</h2><p>Questions about this policy can be sent to <a href='mailto:sales@rtbtradingltd.co.uk'>sales@rtbtradingltd.co.uk</a> or by post to RT&amp;B Trading Ltd, 2 Argyll Road, Stoke-on-Trent, ST3 4RB, United Kingdom.</p>"
 ].join("")}
};
function legalPage(path){
 const page=legalPages[path];
 if(!page)return null;
 return intro(page.title,page.label)+'<section class="legal-content section-pad"><div class="shell"><article class="legal-document">'+page.body+'</article></div></section>';
}
export const localBusinessSchema={
 "@context":"https://schema.org","@type":"LocalBusiness","name":"RT&B Trading Ltd",
 "address":{"@type":"PostalAddress","streetAddress":"2 Argyll Road","addressLocality":"Stoke-on-Trent","postalCode":"ST3 4RB","addressCountry":"GB"},
 "email":"sales@rtbtradingltd.co.uk","url":SITE_URL
};
export function renderHomepage(){return navFix(cardLinks(assetFix(raw())),"/");}
export function renderPage(slugs){
 const path="/"+slugs.join("/"),body=assetFix(raw()),legal=legalPage(path);
 if(legal){
  const top=body.slice(0,body.search(/<main\b/i)),foot=body.match(/<footer\b[^>]*>[\s\S]*?<\/footer>/i)?.[0]||"";
  return navFix(top+'<main id="main">'+legal+'</main>'+foot+'<div class="toast" id="toast" role="status" aria-live="polite"></div>',path);
 }
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
