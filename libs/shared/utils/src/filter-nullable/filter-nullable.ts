/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion */
/* istanbul ignore file */

export const filterNullable = <T>(arr: T[]): Array<NonNullable<T>> => {
  return arr.reduce<Array<NonNullable<T>>>(
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    (acc, el) => (!(el === undefined || el === null) ? [...acc, el!] : acc),
    []
  )
}
