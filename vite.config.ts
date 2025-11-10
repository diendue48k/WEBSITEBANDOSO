import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/da-nang-historical-map/', // 👈 tên repo GitHub của bạn
})
