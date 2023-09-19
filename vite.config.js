import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import basicSsl from '@vitejs/plugin-basic-ssl'

// https://vitejs.dev/config/
export default defineConfig({
    base: '/abpropfunk/',
    plugins: [
        react(),
        basicSsl()
        ],
    server : {
        port: 8000,
        host: true,
        https: true,
    }
})
