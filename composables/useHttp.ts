interface RequestOptions<Body = unknown, Param = unknown> {
  method?: string
  body?: Record<string, Body>
  pick?: string[]
  params?: Record<string, Param>
  mode?: 'cors' | 'no-cors' | 'nagivate' | 'same-origin'
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
    headers: {
      // 'Content-Type': 'application/json',
      cookie: 'account_id=357733426; ltoken=EdZrfTHaiacuEOONcFMd2At9zcxyXqJDmPI71Y5r; ltuid=357733426; _MHYUUID=934884e9-139b-4915-8938-a6ffe6c57196; DEVICEFP_SEED_ID=03541cdf5781ad62; DEVICEFP_SEED_TIME=1669910928289; DEVICEFP=38d7ecd3f136b; cookie_token=HJaikU4fXGjlkK3ud9PPLhXf8JXjWV9oShNlpZr7; aliyungf_tc=c02e16f8a03a71e7913cb553332cba673838482579125b8b40932c33f607694e',
    },
    params: opts?.params,
    mode: 'no-cors',
  })
}
