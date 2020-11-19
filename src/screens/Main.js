import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import {Icon} from 'native-base';
import Iconic from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

// import screen
import Chat from './Chat';
import ChatRoom from './ChatRoom';
import Register from './Register';
import Verification from './Verification';
import Setting from './Setting';

const MainStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        options={{headerShown: false}}
        name="Chat"
        component={Chat}
      />
      <Stack.Screen 
        options={{headerShown: false}}
        name="ChatRoom"
        component={ChatRoom}
      />
      <Stack.Screen 
        options={{headerShown: false}}
        name="Register"
        component={Register}
      />
      <Stack.Screen 
        options={{headerShown: false}}
        name="Verification"
        component={Verification}
      />
    </Stack.Navigator>
  )
}

const SettingStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen
        options={{headerShown: false}}
        name="Setting"
        component={Setting}
      />
    </Stack.Navigator>
  )
}

export default class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTabs.Navigator
          tabBarOptions={{
            activeTintColor: 'tomato',
            inactiveTintColor: 'gray',
          }}
        >
          <BottomTabs.Screen
            options={{
              tabBarIcon: ({size, color, focused}) => (
                <Iconic name="chat-bubble-outline" size={26} color="grey"/>
              ),
            }}
            name="Chat"
            component={MainStack}
          />
          <BottomTabs.Screen
            options={{
              tabBarIcon: ({size, color, focused}) => (
                <Iconic name="settings" size={26} color="grey"/>
              ),
            }}
            name="Setting"
            component={SettingStack}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    );
  }
}
