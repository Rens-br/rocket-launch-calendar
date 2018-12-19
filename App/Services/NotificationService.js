import PushNotification from 'react-native-push-notification'
import { PushNotificationIOS } from 'react-native'

const configure = () => {
  console.log('configuring')
  PushNotification.configure({
    onRegister: function(token) {},

    onNotification: function(notification) {
      notification.finish(PushNotificationIOS.FetchResult.NoData)
    },

    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },

    popInitialNotification: true,
    requestPermissions: true,
  })
}
const scheduledNotification = (data) => {
  PushNotification.localNotificationSchedule(data)
}

export { configure, scheduledNotification }
