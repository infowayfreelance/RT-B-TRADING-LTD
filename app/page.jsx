import { readFileSync } from "node:fs";
import { join } from "node:path";
import Script from "next/script";
export default function HomePage() {
  const html = readFileSync(join(process.cwd(), "site-original.html"), "utf8");
  let body = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i)?.[1] ?? "";
  body = body.replace(/<script\b[^>]*\bsrc=["'](?:\.\/)?app\.js["'][^>]*>\s*<\/script>/gi, "");
  body = body.replace(/(src|href)=(["'])assets\//gi, "$1=$2/assets/");
  return <><div dangerouslySetInnerHTML={{ __html: body }} /><Script src="/app.js" strategy="afterInteractive" /></>;
}

