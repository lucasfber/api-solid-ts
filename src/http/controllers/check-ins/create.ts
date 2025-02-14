import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'
import { makeCheckInUseCase } from '@/use-cases/factories/make-check-in-use-case'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  // criando validação de dados com zod

  const checkinParamsSchema = z.object({
    gymId: z.string().uuid(),
  })

  const createCheckinBodySchema = z.object({
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { latitude: userLatitude, longitude: userLongitude } =
    createCheckinBodySchema.parse(request.body)

  const { gymId } = checkinParamsSchema.parse(request.params)

  const checkInUseCase = makeCheckInUseCase()

  await checkInUseCase.execute({
    userId: request.user.sub,
    gymId,
    userLatitude,
    userLongitude,
  })

  return reply.status(201).send()
}
