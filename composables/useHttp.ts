interface RequestOptions<Body = unknown, Param = unknown> {
  method?: string
  body?: Record<string, Body>
  pick?: string[]
  params?: Record<string, Param>
  mode: 'cors' | 'no-cors' | 'nagivate' | 'same-origin'
}

const getBaseURL = () => {
  const config = useRuntimeConfig()

  return config.public.baseURL
}

export const useHttp = async <Result = unknown, Body = unknown, Param = unknown>(
  endpoint: string, opts?: RequestOptions<Body, Param>,
) => {
  const baseURL = getBaseURL()
  const apiURL = baseURL + endpoint

  return useFetch<Result, string>(apiURL, {
    method: opts?.method ? opts?.method : 'GET',
    body: opts?.body,
    headers: {},
    params: opts?.params,
    mode: 'cors',
  })
}
