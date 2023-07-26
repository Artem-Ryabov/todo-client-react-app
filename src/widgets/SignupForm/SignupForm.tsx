import { useState, useEffect } from 'react';
import useFetchMethod from '@/shared/lib/hooks/useFetchMothod';
import changeInput from '@/shared/lib/helpers/changeInput';
import { httpMethods } from '@/shared/lib/constants/httpMethod';
import { setToken } from '@/shared/lib/helpers/token';

function SignupForm() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { isLoading, data, callFetch } = useFetchMethod<{ token: string }>(
    'http://localhost:5555/api/v1/auth/signup',
    httpMethods.POST,
    { email, password },
    false
  );

  useEffect(() => {
    if (data != null) {
      setToken(data.token);
    }
    console.log(data);
  }, [data]);

  function login(): void {
    callFetch();
  }

  return (
    <div style={{ display: 'flex', gap: '15px', flexDirection: 'column' }}>
      <input
        type='email'
        placeholder='email'
        value={email}
        onChange={changeInput(setEmail)}
      />
      <input
        type='password'
        placeholder='password'
        value={password}
        onChange={changeInput(setPassword)}
      />
      <div>
        <button onClick={login}>Sign up</button>
      </div>
      <div>
        {isLoading ? 'loading...' : null}
        {/* Don't have an account? <Link to={''}>Register a new account</Link> */}
      </div>
    </div>
  );
}

export default SignupForm;