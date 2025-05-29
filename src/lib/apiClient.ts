interface FetchOptions extends RequestInit {
  token?: string
}

function normalizeHeaders(headers: HeadersInit | undefined): Record<string, string> {
  if (!headers) return {}
  if (headers instanceof Headers) {
    const result: Record<string, string> = {}
    headers.forEach((value, key) => {
      result[key] = value
    })
    return result
  }
  if (Array.isArray(headers)) {
    return Object.fromEntries(headers)
  }
  return headers
}

export async function fetchFromApi(
  api: string, 
  path: string, 
  options: FetchOptions = {},
) {
  const url = `${api}${path}`  

  const baseHeaders: Record<string, string> = {
    ...normalizeHeaders(options.headers),    
  }

  if (options.token) {
    baseHeaders["Authorization"] = `Bearer ${options.token}`
  }  

  const res = await fetch(url, {
    ...options,
    headers: baseHeaders,
  })  

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}))   

    if (typeof window !== "undefined" && res.status === 401) {
      const event = new CustomEvent("fetchError", {
        detail: { status: 401 },
      })
      window.dispatchEvent(event)
    }    

    throw new Error(errorData.message || `API Error (${res.status})`) 
  }

  return res
}