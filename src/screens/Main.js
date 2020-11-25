import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {connect} from 'react-redux';
import Iconic from 'react-native-vector-icons/MaterialIcons';

const Stack = createStackNavigator();
const BottomTabs = createBottomTabNavigator();

// import screen
import ChatRoom from './ChatRoom';
import Contact from './Contact'
import ContactInfo from './ContactInfo';
import ProfileUser from './ProfileUser';

// import Bottom Tab Navigator
import TabNavigator from './TabNavigator'

// import Stack
import WelcomeStack from './WelcomeStack'

class Main extends Component {
  render() {
    console.log(this.props)
    return (
      <NavigationContainer>
        {this.props.auth.isLogin ? (
          <Stack.Navigator>
            <Stack.Screen 
              options={{headerShown: false}}
              name="Tab"
              component={TabNavigator}
            />
            <Stack.Screen 
              options={{headerShown: false}}
              name="ChatRoom"
              component={ChatRoom}
            />
            <Stack.Screen 
              options={{headerShown: false}}
              name="ContactInfo"
              component={ContactInfo}
            />
            <Stack.Screen
              options={{headerShown: false}}
              name="ProfileUser"
              component={ProfileUser}
            />
            <Stack.Screen 
              options={{headerShown: false}}
              name="Contact"
              component={Contact}
            />
          </Stack.Navigator>
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