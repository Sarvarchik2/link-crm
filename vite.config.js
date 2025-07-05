import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/auth': 'http://localhost:8000',
  //     '/categories': 'http://localhost:8000',
  //     '/equipment': 'http://localhost:8000',
  //     '/clients': 'http://localhost:8000',
  //     '/rentals': 'http://localhost:8000',
  //     '/dashboard': 'http://localhost:8000',
  //     '/users': 'http://localhost:8000',
  //     '/equipment-movements': 'http://localhost:8000',
  //   }
  // }
})
