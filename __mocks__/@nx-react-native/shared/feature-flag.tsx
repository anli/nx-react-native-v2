import React from 'react'

module.exports = {
  useSplit: jest.fn(() => ({ getTreatment: jest.fn() })),
  SplitProvider: ({ children }) => <>{children}</>
}
