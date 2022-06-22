export type SignInResponse = {status: 'ok' | 'error' | 'invalid_user'};

export function signIn(payload: {login: string, password: string}): Promise<SignInResponse> {
  const body = JSON.stringify(payload);
  return fetch('/api/v1/login', {body, method: 'POST'})
    .then(r => r.ok ? r.json() : Promise.reject(r))
}
