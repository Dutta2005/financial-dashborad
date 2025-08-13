import { GET } from '../aum/route'
import { NextRequest } from 'next/server'

describe('/api/aum', () => {
  it('returns AUM data successfully', async () => {
    const request = new NextRequest('http://localhost:3000/api/aum')
    const response = await GET()
    
    expect(response.status).toBe(200)
    
    const data = await response.json()
    expect(data.success).toBe(true)
    expect(data.data).toHaveProperty('current')
    expect(data.data).toHaveProperty('unit')
    expect(data.data).toHaveProperty('momChange')
    expect(data.data).toHaveProperty('trend')
    expect(data.data).toHaveProperty('lastUpdated')
  })

  it('returns correct data structure', async () => {
    const response = await GET()
    const data = await response.json()
    
    expect(typeof data.data.current).toBe('number')
    expect(typeof data.data.unit).toBe('string')
    expect(typeof data.data.momChange).toBe('number')
    expect(['up', 'down']).toContain(data.data.trend)
    expect(typeof data.data.lastUpdated).toBe('string')
  })
})