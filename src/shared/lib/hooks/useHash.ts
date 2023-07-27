import { useCallback, useState } from 'react';
import getHash from '../helpers/hash';

interface UseHash {
  hash: string;
  sethash: (data: string) => void
}

function useHash(): UseHash {
  const [hash, setHash] = useState('');

  const sethash = useCallback((data: string) => {
    getHash(data).then(d => setHash(d));
  }, [setHash]);

  return { hash, sethash };
}

export default useHash;