import { defineConfig } from "vite";
import { VitePWA, VitePWAOptions } from 'vite-plugin-pwa'
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import/vite";
const { resolve } = require("path");
// PWA setting
const mainfestForPlugin: Partial<VitePWAOptions> = {
  registerType:"prompt",
  includeAssets:["favicon.ico","apple-touch-icon.png","masked-icon.svg"],
  manifest:{
    name:"Vocabulary-hero",
    short_name:"Vocabulary-hero",
    description:"An app that can help boost your english skill",
    icons:[
      {
        src:"/android-launchericon-192-192.png",
        sizes:"192x192",
        type:"image/png"
      },
      {
        src:"/android-launchericon-512-512.png",
        sizes:"512x512",
        type:"image/png",
      },
      {
        src:"/apple-touch-icon.png",
        sizes:"180x180",
        type:"image/png",
        purpose:"apple touch icon"  
      },
       {
        src:"/maskable_icon.png",
        sizes:"225x225",
        type:"image/png",
        purpose:"any maskable"  //這一個非所有瀏覽器都支援
      },
    ],
    theme_color:"#171717",
    background_color:'#000000',
    display:"standalone",
    scope:"/",
    start_url:"/",
    orientation:"portrait"
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    target: "esnext", //browsers can handle the latest ES features,
  },
  plugins: [
    react(),
    AutoImport({
      imports: ["react", "react-router-dom"],
      dts: "src/auto-imports.d.ts",
    }),
    VitePWA(mainfestForPlugin)
  ],
  define: {
    "process.env": {},
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
});
