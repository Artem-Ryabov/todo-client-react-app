import { useEffect, useState } from 'react';
import { HttpMethods, httpMethods } from '../constants/httpMethod';
import { getToken } from '../helpers/token';
import acceptResponse from '../helpers/acceptResponse';
import { Content } from '../models/Content';

interface UseFetch<T> {
  isLoading: boolean;
  data: Content<T> | null;
  error: unknown;
}

function useFetch<T>(
  url: string,
  method: HttpMethods = httpMethods.GET,
  body?: Record<string, unknown>,
  params?: string,
  includeToken: boolean = true
): UseFetch<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Content<T> | null>(null);
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
    fetch(url + (params ?? ''), {
      headers,
      method,
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
