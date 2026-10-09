import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { handleGithubRequest } from './server/github/handler.js'

/**
 * Load server-side secrets from .env into process.env for dev/preview.
 *
 * Vite only exposes VITE_-prefixed variables to client code; plain keys such
 * as GITHUB_TOKEN are read from process.env by server/github/client.js, which
 * Vite does NOT populate from .env. On a serverless host (api/github.js) the
 * platform provides process.env directly — this block only bridges the local
 * dev/preview case.
 *
 * SECURITY: runs inside the Node process only. Values are never logged and
 * never reach import.meta.env / the client bundle (no VITE_ prefix).
 */
function loadServerEnv() {
  const fileEnv = loadEnv(process.cwd(), process.cwd(), '')
  for (const key of ['GITHUB_TOKEN', 'GH_TOKEN', 'GITHUB_USERNAME', 'GITHUB_API_BASE']) {
    if (fileEnv[key] && !process.env[key]) process.env[key] = fileEnv[key]
  }
}
loadServerEnv()

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
