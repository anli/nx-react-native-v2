import React from 'react'

module.exports = {
  useAuth: jest.fn(() => ({ login: jest.fn(), logout: jest.fn() })),
  AuthProvider: ({ children }) => <>{children}</>
}
