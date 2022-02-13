module.exports = {
  useTranslation: jest.fn().mockReturnValue({ t: (key: string) => key })
}
