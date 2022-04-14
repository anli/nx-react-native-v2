const getSortIndex = (ids: string[], id: string): number => {
  const index = ids.findIndex((_item) => _item === id)

  if (index === -1) {
    return ids.length
  }

  return index
}

export const sortByIds = (sortedIds: string[]) => {
  return (a: { id: string }, b: { id: string }): number => {
    const aIndex = getSortIndex(sortedIds, a.id)
    const bIndex = getSortIndex(sortedIds, b.id)

    if (aIndex < bIndex) {
      return -1
    }

    return 1
  }
}
