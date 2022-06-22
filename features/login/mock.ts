import { rest } from 'msw'

export const mockHandlers = [
  // Handles a POST /login request
  rest.post('/api/v1/login', (req, res, ctx) => {
    return res(
      ctx.status(500),
    )
  })
]
