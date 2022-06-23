export type SignInResponse = {status: 'ok' | 'error' | 'invalid_user'};

export function signIn(payload: {login: string, password: string}): Promise<SignInResponse> {
  const body = JSON.stringify(payload);
  const headers = {'Content-Type': 'application/json'}
  return fetch('/api/v1/login2', {body, method: 'POST', headers})
    .then(r => r.json())
}
