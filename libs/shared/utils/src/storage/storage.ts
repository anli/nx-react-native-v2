import AsyncStorage from '@react-native-async-storage/async-storage'

const set = async (key: string, value: string[]): Promise<void> => {
  const jsonValue = JSON.stringify(value)
  await AsyncStorage.setItem(key, jsonValue)
}

const get = async (key: string): Promise<string[]> => {
  const jsonValue = await AsyncStorage.getItem(key)
  return jsonValue != null ? JSON.parse(jsonValue) : []
}

export const Storage = {
  set,
  get,
  clear: AsyncStorage.clear
}
