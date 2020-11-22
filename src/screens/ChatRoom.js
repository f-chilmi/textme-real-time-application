import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Text} from 'react-native';
import Iconic from 'react-native-vector-icons/MaterialIcons';
import {Icon} from 'native-base';
import {Header, Input} from 'react-native-elements';

export default class ChatRoom extends Component {
  register = () => {
    this.props.navigation.navigate('Register')
  }
  render() {
    return (
      <View style={style.parent}>
        <Header 
          placement="left"
          backgroundColor="#f5f5f5"
          leftComponent={
            <Iconic onPress={this.register} name='chevron-left' type='FontAwesome' color='#1e90ff' size={28} />
          }
          centerComponent={{ text: 'Sender', style: { color: 'black' }, }}
          rightComponent={{ icon: 'call', color: '#1e90ff' }}
        />

        {/* <ScrollView style={{padding: '3%'}}>
          <Text>text yang sangat panjang </Text>
        </ScrollView> */}

        <View style={style.bottomWrapper}>
          {/* <Icon name='plus' fontSize='10' type='FontAwesome' style={style.iconLeft}/> */}
          <Iconic name='add' size={25} style={style.iconLeft} />
          <Input 
            containerStyle={style.containerStyle}
            inputStyle={style.inputChat}
            inputContainerStyle={{height: '100%'}}
          />
          <Iconic name='camera-alt' size={28} style={style.iconRight} />
          {/* <Icon name="camera" type="FontAwesome" style={style.iconRight} /> */}
        </View>


      </View>
    );
  }
}

const style = StyleSheet.create({
  parent: {
    flex: 1,
    // padding: '3%',
    backgroundColor: 'white',
  },
  bottomWrapper: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 'auto',
  },
  containerStyle: {
    backgroundColor: 'white',
    height: '100%',
    width: '80%',
    borderRadius: 30,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    padding: 0,
    // justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 8
  },
  iconRight: {
    marginLeft: 'auto'
  },
  inputChat: {
    fontSize: 10,
  },
});
