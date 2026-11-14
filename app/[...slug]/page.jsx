import Script from "next/script";
import {notFound} from "next/navigation";
import {renderPage,routes,services} from "../../lib/site";
export function generateStaticParams(){return routes.map(x=>({slug:x.split("/")}))}
export async function generateMetadata({params}){
 const {slug}=await params;
 const path=slug.join("/");
 const titles={about:"About Us",services:"Our Services",materials:"Building Materials",approach:"Our Approach",contact:"Contact",faqs:"FAQs"};
 const name=titles[path]||services.find(x=>path==="services/"+x[0])?.[1]||"RT&B Trading Ltd";
 return {title:name+" | RT&B Trading Ltd",description:name+" — building projects and material enquiries in Stoke-on-Trent.",alternates:{canonical:"/"+path}};
}
export default async function Page({params}){const {slug}=await params;const html=renderPage(slug);if(!html)notFound();return <><div dangerouslySetInnerHTML={{__html:html}}/><Script src="/app.js" strategy="afterInteractive"/></>}
