import { defineConfig } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import { tanstackStart } from '@tanstack/react-start/plugin/vite'
import viteReact from '@vitejs/plugin-react'
import viteTsConfigPaths from 'vite-tsconfig-paths'
import tailwindcss from '@tailwindcss/vite'
import { cloudflare } from '@cloudflare/vite-plugin'

const config = defineConfig({
  plugins: [
    devtools(),
    cloudflare({ viteEnvironment: { name: 'ssr' } }),
    // this is the plugin that enables path aliases
    viteTsConfigPaths({
      projects: ['./tsconfig.json'],
    }),
    tailwindcss(),
    tanstackStart(),
    viteReact(),
    {
      name: 'replace-domino-require',
      enforce: 'pre',
      transform(code, id) {
        if (!id || !id.includes('node_modules/turndown')) return null;
        const pattern = /require\(['"]@mixmark-io\/domino['"]\)/g;
        if (pattern.test(code)) {
          const replaced = code.replace(pattern, 'undefined');
          return { code: replaced, map: null };
        }
        return null;
      },
    },
  ],
})

export default config
