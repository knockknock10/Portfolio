/**
 * Serverless entry point (Vercel-style `api/` directory).
 * Keeps GITHUB_TOKEN server-side: Browser → /api/github/* → here → GitHub.
 * On hosts without serverless functions, the same handler is mounted by the
 * Vite plugin in vite.config.js for dev and preview.
 */
import { handleGithubRequest } from '../server/github/handler.js'

export default async function handler(req, res) {
  await handleGithubRequest(req, res)
}
