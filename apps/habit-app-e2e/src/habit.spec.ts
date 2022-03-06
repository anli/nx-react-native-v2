import { faker } from '@faker-js/faker'
import { by, device, element } from 'detox'
import { LoginScreen } from './helper'

describe('Habit App', () => {
  const habitData = {
    name: faker.lorem.word(),
    updateName: faker.lorem.word()
  }

  beforeEach(async () => {
    await device.reloadReactNative()
    await LoginScreen.iAmAtLoginScreen()
  })

  it('Given I am at Habits Screen, When I create, update, delete Habit, Then I should see Habit created, updated, deleted', async () => {
    await LoginScreen.goToHabitsScreen()

    // create
    await element(by.label('Create Habit Button')).atIndex(0).tap()

    await waitFor(element(by.id('HabitCreateScreen')))
      .toBeVisible()
      .withTimeout(10000)

    await waitFor(element(by.id('NameInput')))
      .toBeVisible()
      .withTimeout(10000)
    await element(by.id('NameInput')).typeText(habitData.name)

    await element(by.id('SubmitButton')).atIndex(0).tap()

    await waitFor(element(by.id('HabitsScreen')))
      .toBeVisible()
      .withTimeout(10000)

    await waitFor(element(by.text(habitData.name)))
      .toBeVisible()
      .withTimeout(10000)

    // update
    await waitFor(element(by.text(habitData.name)))
      .toBeVisible()
      .withTimeout(10000)
    await element(by.text(habitData.name)).atIndex(0).tap()

    await waitFor(element(by.text('Update')))
      .toBeVisible()
      .withTimeout(10000)
    await element(by.text('Update')).atIndex(0).tap()
    await waitFor(element(by.id('HabitUpdateScreen')))
      .toBeVisible()
      .withTimeout(10000)

    await waitFor(element(by.id('NameInput')))
      .toBeVisible()
      .withTimeout(10000)
    await element(by.id('NameInput')).replaceText(habitData.updateName)
    await element(by.id('SubmitButton')).atIndex(0).tap()
    await waitFor(element(by.id('HabitsScreen')))
      .toBeVisible()
      .withTimeout(10000)

    await waitFor(element(by.text(habitData.updateName)))
      .toBeVisible()
      .withTimeout(10000)

    // delete
    await element(by.text(habitData.updateName)).atIndex(0).tap()
    await element(by.text('Delete')).atIndex(0).tap()
    await waitFor(element(by.text(habitData.updateName)))
      .not.toBeVisible()
      .withTimeout(10000)
  })
})
