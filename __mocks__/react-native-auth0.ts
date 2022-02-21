class Auth {
  get webAuth(): {
    authorize: jest.Mock
    clearSession: jest.Mock
  } {
    return {
      authorize: jest.fn().mockResolvedValue({
        idToken: 'ID_TOKEN',
        accessToken: 'ACCESS_TOKEN'
      }),
      clearSession: jest.fn().mockResolvedValue({})
    }
  }

  get auth(): {
    userInfo: jest.Mock
  } {
    return {
      userInfo: jest.fn().mockResolvedValue({ email: 'user@email.com' })
    }
  }
}

module.exports = Auth
