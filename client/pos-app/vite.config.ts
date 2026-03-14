import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@modix/pkgs/contracts': path.resolve(
        __dirname,
        '../../pkgs/contracts/src'
      )
    }
  }
})