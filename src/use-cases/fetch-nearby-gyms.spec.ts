import { beforeEach, describe, expect, it } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { FetchNearbyGymsUseCase } from './fetch-nearby-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: FetchNearbyGymsUseCase

describe('Fetch Nearby Gyms Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new FetchNearbyGymsUseCase(gymsRepository)
  })

  it('should be able to fetch nearby gyms', async () => {
    gymsRepository.create({
      title: 'Jitirana Gym',
      description: '',
      phone: '',
      latitude: -4.3624417, // Jitirana
      longitude: -38.8323027,
    })

    gymsRepository.create({
      title: 'CFit',
      description: '',
      phone: '',
      latitude: -4.4662117, // academia da minha rua
      longitude: -38.9005317,
    })

    const { gyms } = await sut.execute({
      // minha casa
      userLatitude: -4.4663367,
      userLongitude: -38.9006407,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'CFit' })])
  })
})
