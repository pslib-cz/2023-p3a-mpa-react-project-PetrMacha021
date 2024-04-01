import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react-swc'
import {TanStackRouterVite} from "@tanstack/router-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),
    TanStackRouterVite()
  ],
  base: '/2023-p3a-mpa-react-project-PetrMacha021/'
})
