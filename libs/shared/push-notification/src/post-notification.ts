import OneSignal from 'react-native-onesignal'

/* istanbul ignore next */
export const postNotification = async (
  title: string,
  message: string,
  userIds: string[]
): Promise<void> => {
  const notification = {
    headings: { en: title },
    contents: { en: message },
    include_player_ids: userIds
  }
  // eslint-disable-next-line @typescript-eslint/return-await
  return new Promise((resolve, reject) => {
    OneSignal.postNotification(
      JSON.stringify(notification),
      () => {
        resolve()
      },
      (error) => {
        reject(error)
      }
    )
  })
}
