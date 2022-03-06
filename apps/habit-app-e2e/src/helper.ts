export const TIMEOUT_MILLISECONDS = 10000

const iAmAtLoginScreen = async (): Promise<void> => {
  await waitFor(element(by.id('LoginScreen')))
    .toBeVisible()
    .withTimeout(TIMEOUT_MILLISECONDS)
}

const goToHabitsScreen = async (): Promise<void> => {
  await iAmAtLoginScreen()

  await element(by.label('Login Button')).atIndex(0).tap()

  await waitFor(element(by.id('HabitsScreen')))
    .toBeVisible()
    .withTimeout(TIMEOUT_MILLISECONDS)
}

export const LoginScreen = {
  iAmAtLoginScreen,
  goToHabitsScreen
}
