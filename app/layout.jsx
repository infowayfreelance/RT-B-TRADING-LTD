import CookieConsent from "../components/CookieConsent";
export const metadata = {
 metadataBase:new URL("https://rtbtradingltd.co.uk"),
 title:{default:"RT&B Trading Ltd | Construction & Building Materials in Stoke-on-Trent",template:"%s"},
 description:"RT&B Trading Ltd supports construction projects and building material enquiries in Stoke-on-Trent.",
 icons:{icon:"/assets/favicon.svg"}
};
export default function RootLayout({children}){
 return <html lang="en-GB"><head>
  <meta name="theme-color" content="#15201d"/><meta name="viewport" content="width=device-width, initial-scale=1"/>
  <link rel="preconnect" href="https://fonts.googleapis.com"/><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
  <link href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet"/>
  <link rel="stylesheet" href="/styles.css"/><link rel="stylesheet" href="/page-additions.css"/><link rel="stylesheet" href="/mobile-responsive.css"/><link rel="stylesheet" href="/compliance.css"/>
 </head><body>{children}<CookieConsent/></body></html>;
}
