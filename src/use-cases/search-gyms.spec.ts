import { beforeEach, describe, expect, it } from 'vitest'

import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from './search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()

    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search gyms', async () => {
    await gymsRepository.create({
      title: 'JavaScript Gym',
      description: '',
      phone: '',
      latitude: -4.4665923,
      longitude: -38.9012613,
    })

    await gymsRepository.create({
      title: 'Typescript Gym',
      description: '',
      phone: '',
      latitude: -4.4665923,
      longitude: -38.9012613,
    })

    const { gyms } = await sut.execute({
      search: 'JavaScript',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'JavaScript Gym' })])
  })

  it('should be able fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Typescript Gym ${i}`,
        description: '',
        phone: '',
        latitude: -4.4665923,
        longitude: -38.9012613,
      })
    }

    const { gyms } = await sut.execute({
      search: 'Typescript',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Typescript Gym 21' }),
      expect.objectContaining({ title: 'Typescript Gym 22' }),
    ])
  })
})
