class Auth {
  get webAuth(): {
    authorize: jest.Mock
    clearSession: jest.Mock
  } {
    return {
      authorize: jest.fn().mockResolvedValue({
        idToken: 'ID_TOKEN',
        accessToken: 'ACCESS_TOKEN',
        refreshToken: 'REFRESH_TOKEN'
      }),
      clearSession: jest.fn().mockResolvedValue({})
    }
  }

  get auth(): {
    userInfo: jest.Mock
    refreshToken: jest.Mock
  } {
    return {
      userInfo: jest.fn().mockResolvedValue({ email: 'user@email.com' }),
      refreshToken: jest.fn().mockResolvedValue({
        idToken: 'ID_TOKEN',
        accessToken: 'ACCESS_TOKEN',
        refreshToken: 'REFRESH_TOKEN'
      })
    }
  }
}

module.exports = Auth
