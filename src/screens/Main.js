import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import {Icon} from 'native-base';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

// import screen
import Home from './Home';

export default class Main extends Component {
  render() {
    return (
      <NavigationContainer>
        <BottomTabs.Navigator>
          <BottomTabs.Screen
            options={{
              tabBarIcon: ({size, color, focused}) => (
                <Icon name="home" size={20} color={color} />
              ),
            }}
            name="Home"
            component={Home}
          />
        </BottomTabs.Navigator>
      </NavigationContainer>
    );
  }
}
