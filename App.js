import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react'
import PushNotification from 'react-native-push-notification'

import Main from './src/screens/Main';
import store from './src/redux/store';

// PushNotification.configure({
//   onRegister: function (token) {
//     console.log(`Token: ${JSON.stringify(token)}`)
//   },
//   onNotification: function (notif) {
//     console.log(`Notif: ${notif}`)
//     PushNotification.localNotification({
//       channelId: 'importance',
//       title: 'Hello',
//       message: notif.message
//     })
//   },
//   onRegistrationError: function (err) {
//     console.error(err.message, err)
//   }
// })

// PushNotification.createChannel(
//   {
//     channelId: 'notif',
//     channelName: 'Notif channel',
//     channelDescription: 'Test',
//     soundName: 'default',
//     importance: 4,
//     vibrate: true
//   },
//   (created) => console.log(`created channel return '${created}'`)
// )

class App extends Component {
  render() {
    return (
      <Provider store={store().store}>
        <PersistGate loading={null} persistor={store().persistor}>
          <Main />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;