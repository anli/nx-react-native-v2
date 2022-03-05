import { by, device, element, expect } from 'detox'

describe('Habit App', () => {
  beforeEach(async () => {
    await device.reloadReactNative()
    await waitFor(element(by.id('LoginScreen')))
      .toBeVisible()
      .withTimeout(10000)
  })

  xit('Given I am at Login Screen, When I press Login, Then I am at Habits Screen', async () => {
    await expect(element(by.text('My title'))).toBeVisible()
    await expect(element(by.text('My subtitle'))).toBeVisible()

    const button = element(by.label('Login Button')).atIndex(0)
    await expect(button).toBeVisible()
    await button.tap()

    await waitFor(element(by.id('HabitsScreen')))
      .toBeVisible()
      .withTimeout(10000)
  })

  it('Given I am at Habits Screen, When I press Habit Create Button, Then I am at Habit Create Screen', async () => {
    await element(by.label('Login Button')).atIndex(0).tap()

    await waitFor(element(by.id('HabitsScreen')))
      .toBeVisible()
      .withTimeout(10000)

    await element(by.label('Create Habit Button')).atIndex(0).tap()

    await waitFor(element(by.id('HabitCreateScreen')))
      .toBeVisible()
      .withTimeout(10000)
  })
})
