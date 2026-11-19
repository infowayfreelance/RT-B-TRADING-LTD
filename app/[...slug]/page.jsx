import Script from "next/script";
import {notFound} from "next/navigation";
import {renderPage,routes,buildMetadata} from "../../lib/site";
export function generateStaticParams(){return routes.map(x=>({slug:x.split("/")}));}
export async function generateMetadata({params}){const {slug}=await params;return buildMetadata("/"+slug.join("/"));}
export default async function Page({params}){const {slug}=await params;const html=renderPage(slug);if(!html)notFound();return <><div dangerouslySetInnerHTML={{__html:html}}/><Script src="/app.js" strategy="afterInteractive"/></>;}
