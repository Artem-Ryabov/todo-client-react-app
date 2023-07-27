import { useEffect, useState } from 'react';
import { HttpMethods } from '../constants/httpMethod';
import { getToken } from '../helpers/token';
import acceptResponse from '../helpers/acceptResponse';

interface UseFetch<T> {
  isLoading: boolean;
  data: T | null;
  error: unknown;
}

function useFetch<T>(
  url: string,
  method: HttpMethods,
  body?: Record<string, unknown>,
  includeToken: boolean = true
): UseFetch<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  useEffect(() => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    };
    const token = getToken();
    if (includeToken && token != null && token != '') {
      headers['Authorization'] = `Bearer ${token}`;
    }
    setIsLoading(true);
    fetch(url, {
      headers,
      method: method,
      body: JSON.stringify(body)
    })
      .then(acceptResponse)
      .then(d => setData(d))
      .catch(e => setError(e))
      .finally(() => setIsLoading(false));
  }, [url, method, body, includeToken]);

  return { isLoading, data, error };
}

export default useFetch;
