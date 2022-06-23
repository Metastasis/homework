import { rest } from 'msw'

class Storage<T = unknown> {
  key: string
  defaultValues: T

  constructor(key: string, defaultValues: T) {
    this.key = key
    this.defaultValues = defaultValues
  }

  save(object: T) {
    const result = JSON.stringify(object);
    sessionStorage.setItem(this.key, result);
  }

  load(): T {
    try {
      const objectStr = sessionStorage.getItem(this.key);
      return objectStr ? JSON.parse(objectStr) : this.defaultValues;
    } catch(err) {
      return this.defaultValues;
    }
  }
}


const storage = new Storage(
  '_homework_users',
  [
    {login: 'john', password: 'doe'},
    {login: 'test', password: 'test'},
    {login: 'admin', password: 'admin'}
  ]
)

export const mockHandlers = [
  rest.post<{login?: string, password?: string}>('/api/v1/login', (req, res, ctx) => {
    const login = req.body.login ? req.body.login.trim().toLowerCase() : ''
    const password = req.body.password ? req.body.password.trim() : ''
    if (!login || !password) {
      return res(
        ctx.status(400),
        ctx.json({status: 'invalid_user'})
      )
    }
    const users = storage.load()
    const user = users.find(
      user => user.login === login && user.password === password
    )
    if (!user) {
      return res(
        ctx.status(400),
        ctx.json({status: 'invalid_user'})
      )
    }
    return res(
      ctx.status(200),
      ctx.json({status: 'ok'})
    )
  })
]
