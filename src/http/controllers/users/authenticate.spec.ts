import request from 'supertest'
import { app } from '@/app'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

describe('Authenticate (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate a existing user', async () => {
    const email = 'johndoe@example.com'
    const password = '123456'

    await request(app.server).post('/register').send({
      name: 'John Doe',
      email,
      password,
    })

    const response = await request(app.server).post('/sessions').send({
      email,
      password,
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      token: expect.any(String),
    })
  })
})
