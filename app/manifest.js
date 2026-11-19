export default function manifest() {
  return {
    name: "RT&B Trading Ltd",
    short_name: "RT&B",
    description: "RT&B Trading Ltd - Construction and building materials in Stoke-on-Trent.",
    start_url: "/",
    display: "standalone",
    background_color: "#f8f7f2",
    theme_color: "#15251f",
    icons: [
      { src: "/brand/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/brand/icon-512.png", sizes: "512x512", type: "image/png" }
    ]
  };
}
