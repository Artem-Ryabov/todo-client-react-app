import { useState, useEffect, useCallback } from 'react';
import useFetchMethod from '@/shared/lib/hooks/useFetchMothod';
import changeInput from '@/shared/lib/helpers/changeInput';
import { httpMethods } from '@/shared/lib/constants/httpMethod';
import { getToken, setToken } from '@/shared/lib/helpers/token';
import { Link, useNavigate } from 'react-router-dom';
import paths from '@/app/lib/router/paths';
import useHash from '@/shared/lib/hooks/useHash';

function LoginForm(): JSX.Element {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const nav = useNavigate();
  const { hash, createHash } = useHash();
  const { isLoading, data, callFetch } = useFetchMethod<{ token: string }>(
    'http://localhost:5555/api/v1/auth/login',
    httpMethods.POST,
    false
  );

  useEffect(() => {
    if (data != null) {
      setToken(data.content.token);
      nav(paths.home);
    }
  }, [data]);

  useEffect(() => createHash(password), [password]);

  useEffect(() => {
    const token = getToken();
    if (token != null && token != '') {
      nav(paths.home);
    }
  }, []);

  const login = useCallback(() => {
    const body = { email, password: hash };
    callFetch(body);
  }, [email, hash]);

  return (
    <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
      <input
        type="email"
        placeholder="email"
        value={email}
        onChange={changeInput(setEmail)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={changeInput(setPassword)}
      />
      <div>
        <button onClick={login}>Log in</button>
      </div>
      <div>
        Don't have an account?{' '}
        <Link to={paths.signup}>Create a new account</Link>
      </div>
    </div>
  );
}

export default LoginForm;
