import { handleGithubRequest } from '../../server/github/handler.js'

/**
 * Netlify adapter for the same server-only GitHub handler used by Vercel and
 * the Vite dev server. The token remains in the function environment.
 */
export const handler = async (event) => {
  const rawUrl = event.rawUrl || event.path || '/api/github'
  const requestUrl = new URL(rawUrl, 'https://netlify.local')

  // Some Netlify event versions expose query parameters separately from rawUrl.
  if (!requestUrl.search && event.queryStringParameters) {
    for (const [key, value] of Object.entries(event.queryStringParameters)) {
      if (value != null) requestUrl.searchParams.set(key, String(value))
    }
  }

  const responseHeaders = {}
  let responseBody = ''
  const response = {
    statusCode: 200,
    setHeader(name, value) {
      responseHeaders[name] = value
    },
    end(body = '') {
      responseBody = String(body)
    },
  }

  try {
    await handleGithubRequest(
      { method: event.httpMethod || 'GET', url: `${requestUrl.pathname}${requestUrl.search}` },
      response,
    )
    return {
      statusCode: response.statusCode,
      headers: responseHeaders,
      body: responseBody,
    }
  } catch {
    return {
      statusCode: 500,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Cache-Control': 'no-store',
      },
      body: JSON.stringify({
        ok: false,
        error: { code: 'unavailable', message: 'GitHub API is temporarily unavailable' },
      }),
    }
  }
}
