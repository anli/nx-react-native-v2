import { by, device, element, expect } from 'detox'
import { LoginScreen } from './utils'

describe('Given I am at Login Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
    await LoginScreen.iAmAtLoginScreen()
  })

  it('When I press Login, Then I am at Habits Screen', async () => {
    await expect(element(by.text('My title'))).toBeVisible()
    await expect(element(by.text('My subtitle'))).toBeVisible()

    const button = element(by.label('Login Button')).atIndex(0)
    await expect(button).toBeVisible()

    await LoginScreen.goToHabitsScreen()
  })
})
