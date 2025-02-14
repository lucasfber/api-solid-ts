import { FastifyInstance } from 'fastify'
import { register } from './register'
import { authenticate } from './authenticate'
import { profile } from './profile'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
import { refresh } from './refresh'

export async function usersRoutes(app: FastifyInstance) {
  app.post('/register', register)
  app.post('/sessions', authenticate)

  app.patch('/token/refresh', refresh)

  /** From here on, we need authentication */
  app.get('/me', { onRequest: [verifyJWT] }, profile)
}
