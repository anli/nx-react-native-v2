import { useEffect, useState } from 'react'
import { Storage } from '../storage'
import { sortByIds } from './sort-by-ids'

export const useSort = (
  key: string
): {
    set: (_data: string[]) => Promise<void>
    compareFn: (
    a: {
      id: string
    },
    b: {
      id: string
    }
    ) => number
  } => {
  const [data, setData] = useState<string[]>([])

  useEffect(() => {
    const init = async (): Promise<void> => {
      setData(await Storage.get(key))
    }

    void init()
  }, [key])

  const set = async (_data: string[]): Promise<void> => {
    setData(_data)
    await Storage.set(key, _data)
  }

  return {
    set,
    compareFn: sortByIds(data)
  }
}
