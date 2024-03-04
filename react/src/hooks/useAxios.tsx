import axios from 'axios'
import { useState } from 'react'

export type MakeRequestParams = {
  method: 'get' | 'post' | 'put' | 'delete'
  url: string
  params?: Record<string, any>
}

type UseAxiosResult<T> = {
  makeRequest: (params: MakeRequestParams) => Promise<void>
  data: T | null
  loading: boolean
  error: string | null
  setError: (error: string | null) => void
}

export const useAxios = <T,>(): UseAxiosResult<T> => {
  const [data, setData] = useState<T | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const makeRequest = async (params: MakeRequestParams): Promise<void> => {
    try {
      setLoading(true)
      setError(null)

      const response = await axios({
        method: params.method,
        url: params.url,
        data: params.method === 'post' ? params.params : undefined,
        params: params.method === 'get' ? params.params : undefined,
      })

      setData(response.data)
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const axiosError = error
        setError(axiosError.response?.data?.error || 'Something went wrong...')
      } else {
        setError('Something went wrong...')
      }
    } finally {
      setLoading(false)
    }
  }

  return { makeRequest, data, loading, error, setError }
}
