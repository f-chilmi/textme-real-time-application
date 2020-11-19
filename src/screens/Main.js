import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import {Icon} from 'native-base';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

// import screen
import Chat from './Chat';

const MainStack = () => {
  return(
    <Stack.Navigator>
      <Stack.Screen 
        options={{headerShown: false}}
        name="Chat"
        component={Chat}
      />
    </Stack.Navigator>
  )
}

export default class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTabs.Navigator>
          <BottomTabs.Screen
            options={{
              tabBarIcon: ({size, color, focused}) => (
                <Icon name="chat" size={20} color={color} type="MaterialIcons" />
              ),
            }}
            name="Chat"
            component={MainStack}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    );
  }
}
