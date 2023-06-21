import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  // server: {
  //   host: '0.0.0.0',
  //   port: 10123,
  //   hmr: {
  //     host: 'cc221020-10123.node.fhstp.io',
  //     protocol: 'wss',
  //     port: 10123
  //   },
  // },
})
