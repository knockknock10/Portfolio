import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleGithubRequest } from './server/github/handler.js'

/**
 * Serves /api/github/* in `vite dev` and `vite preview` using the same
 * handler the serverless function (api/github.js) uses in production.
 * GitHub data is fetched server-side here — the browser never sees a token.
 */
function githubApiPlugin() {
  const mount = (middlewares) => {
    middlewares.use((req, res, next) => {
      if (!req.url?.startsWith('/api/github')) return next()
      handleGithubRequest(req, res).catch(next)
    })
  }
  return {
    name: 'github-api',
    configureServer(server) {
      mount(server.middlewares)
    },
    configurePreviewServer(ctx) {
      mount(ctx.middlewares)
    },
  }
}

export default defineConfig({
  // BrowserRouter serves deep routes (e.g. /work/aevor) from the site root,
  // so assets and routes must be root-absolute.
  base: '/',
  plugins: [react(), tailwindcss(), githubApiPlugin()],
  preview: {
    port: 4173,
  },
})
