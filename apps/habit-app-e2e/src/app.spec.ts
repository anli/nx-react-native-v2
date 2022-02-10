import { by, device, element, expect } from 'detox'

describe('Habit App', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
  })

  it('should display welcome message', async () => {
    await expect(element(by.text('Welcome'))).toBeVisible()
  })
})
