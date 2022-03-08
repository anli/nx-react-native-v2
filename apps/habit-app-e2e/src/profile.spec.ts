import { device } from 'detox'
import { LoginScreen } from './utils'

describe('Given I am at Profile Screen', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
    await LoginScreen.iAmAtLoginScreen()
    await LoginScreen.goToProfileScreen()
  })

  it('When I logout, Then I should see Login Screen', async () => {
    await element(by.text('Logout')).atIndex(0).tap()

    await LoginScreen.iAmAtLoginScreen()
  })
})
