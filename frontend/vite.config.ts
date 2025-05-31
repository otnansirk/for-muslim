import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import webExtension from 'vite-plugin-web-extension'
import svgr from 'vite-plugin-svgr'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        svgr(),
        react(),
        webExtension({
            manifest: 'manifest.json',
            additionalInputs: [
                "offscreen.html"
            ]
        })
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, '/src'),
        }
    }
})
