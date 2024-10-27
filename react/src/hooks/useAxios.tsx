import axios from 'axios'
import { useState, useCallback } from 'react'
import { useAuthContext } from './useAuthContext'

export type requestConfigParams = {
  method: 'get' | 'post' | 'put' | 'patch' | 'delete'
  url: string
  params?: Record<string, any>
}

type handleDataType = (data: {}) => void | []

type UseAxiosResult = {
  makeRequest: (
    requestConfig: requestConfigParams,
    handleData: handleDataType
  ) => Promise<void>
  loading: boolean
  error: string | null
  setError: (error: string) => void
}

export const useAxios = (): UseAxiosResult => {
  const { authToken, handleLogOut } = useAuthContext()
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  const makeRequest = useCallback(
    async (
      requestConfig: requestConfigParams,
      handleData: handleDataType
    ): Promise<void> => {
      try {
        setLoading(true)
        setError(null)

        const response = await axios({
          method: requestConfig.method,
          url: requestConfig.url,
          data:
            requestConfig.method === 'post' || requestConfig.method === 'put'
              ? requestConfig.params
              : undefined,
          params:
            requestConfig.method === 'get' ? requestConfig.params : undefined,
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${authToken}`,
          },
        })
        console.log('response.data: ', response.data)
        handleData(response.data)
      } catch (error) {
        if (axios.isAxiosError(error)) {
          const axiosError = error
          const errorText = axiosError.response?.data?.error
          if (errorText.includes('Auth token')) {
            handleLogOut()
          }
          setError(errorText || 'Something went wrong...')
        } else {
          setError('Something went wrong...')
        }
      } finally {
        setLoading(false)
      }
    },
    []
  )

  return { makeRequest, loading, error, setError }
}
