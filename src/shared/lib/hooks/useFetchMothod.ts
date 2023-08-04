import { useCallback, useState } from 'react';
import { HttpMethods, httpMethods } from '../constants/httpMethod';
import { getToken } from '../helpers/token';
import acceptResponse from '../helpers/acceptResponse';
import { Content } from '../models/Content';

interface UseFetchMethod<T> {
  isLoading: boolean;
  data: Content<T> | null;
  callFetch: (body?: unknown, params?: string) => void;
  error: unknown;
}

function useFetchMethod<T>(
  url: string,
  method: HttpMethods = httpMethods.GET,
  includeToken: boolean = true
): UseFetchMethod<T> {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState<Content<T> | null>(null);
  const [error, setError] = useState<unknown | null>(null);

  const callFetch = useCallback((body?: unknown, params?: string) => {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json'
    }
    const token = getToken();
    if (includeToken && token != null && token != '') {
      headers['Authorization'] = `Bearer ${token}`;
    }
    setIsLoading(true);
    fetch(url + (params ?? ''), {
      headers,
      method: method,
      body: JSON.stringify(body)
    })
      .then(acceptResponse)
      .then(d => setData(d))
      .catch(e => setError(e))
      .finally(() => setIsLoading(false));
  }, [url, method, includeToken]);

  return { isLoading, data, callFetch, error };
}

export default useFetchMethod;
