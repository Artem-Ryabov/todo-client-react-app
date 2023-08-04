import { useCallback, useState } from 'react';
import getHash from '../helpers/hash';

interface UseHash {
  hash: string;
  createHash: (data: string) => void
}

function useHash(): UseHash {
  const [hash, setHash] = useState('');

  const createHash = useCallback((data: string) => {
    getHash(data).then(d => setHash(d));
  }, [setHash]);

  return { hash, createHash };
}

export default useHash;