import Script from "next/script";
import {renderHomepage} from "../lib/site";
export default function HomePage(){return <><div dangerouslySetInnerHTML={{__html:renderHomepage()}}/><Script src="/app.js" strategy="afterInteractive"/></>}
