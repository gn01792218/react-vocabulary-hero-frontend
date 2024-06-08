# vocabulary-hero
# react+ts+tailwindCss 樣板
## 讓專案擁有自動import 功能
```javascript
npm i -D unplugin-auto-import

//vite.config.ts
import { defineConfig } from 'vite'
import AutoImport from 'unplugin-auto-import/vite'

export default defineConfig({
  plugins: [
    react(),
    AutoImport({
      imports:['react', 'react-router-dom'],
      dts:'src/auto-imports.d.ts'
    })
  ],
})
```
## 圖片辨識文字功能 - tesseract
使用套件 
https://tesseract.projectnaptha.com/
