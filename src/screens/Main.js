import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import Iconic from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

// import screen

// import Stack
import WelcomeStack from './WelcomeStack'
import MainStack from './MainStack'
import SettingStack from './SettingStack'

class Main extends Component {
  render() {
    console.log(this.props)
    return (
      <NavigationContainer>
        {this.props.auth.isLogin ? (
          <BottomTabs.Navigator
            tabBarOptions={{
              activeTintColor: '#1e90ff',
              inactiveTintColor: 'gray',
            }}
          >
            <BottomTabs.Screen
              options={{
                tabBarIcon: ({size, color, focused}) => (
                  <Iconic name="chat-bubble-outline" color={color} size={size} color="grey"/>
                ),
              }}
              name="Chat"
              component={MainStack}
            />
            <BottomTabs.Screen
              options={{
                tabBarIcon: ({size, color, focused}) => (
                  <Iconic name="settings" color={color} size={size} color="grey"/>
                ),
              }}
              name="Setting"
              component={SettingStack}
            />
          </BottomTabs.Navigator>
        ) : (
          <Stack.Navigator>
            <Stack.Screen 
              options={{headerShown: false}}
              name="Welcome"
              component={WelcomeStack}
            />
          </Stack.Navigator>
        )}
        
      </NavigationContainer>
    );
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(Main);