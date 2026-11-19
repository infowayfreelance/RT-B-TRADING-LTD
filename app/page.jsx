import Script from "next/script";
import {renderHomepage,localBusinessSchema,buildMetadata} from "../lib/site";
export const metadata = buildMetadata("/");
export default function HomePage(){
 const schema=JSON.stringify(localBusinessSchema).replace(/</g,"\\u003c");
 return <><script type="application/ld+json" dangerouslySetInnerHTML={{__html:schema}}/><div dangerouslySetInnerHTML={{__html:renderHomepage()}}/><Script src="/app.js" strategy="afterInteractive"/></>;
}
