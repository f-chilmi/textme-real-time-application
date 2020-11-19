import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Text} from 'react-native';
import {Icon} from 'native-base';
import {Header, Input} from 'react-native-elements';

export default class ChatRoom extends Component {
  render() {
    return (
      <View style={style.parent}>
        <Header 
          placement="left"
          backgroundColor="#f5f5f5"
          leftComponent={<Icon name='chevron-left' type='FontAwesome' color='#1e90ff' fontSize={10} /> }
          centerComponent={{ text: 'Sender', style: { color: 'black' }, }}
          rightComponent={{ icon: 'call', color: '#1e90ff' }}
        />

        {/* <ScrollView style={{padding: '3%'}}>
          <Text>text yang sangat panjang </Text>
        </ScrollView> */}

        <View style={style.bottomWrapper}>
          <Icon name='plus' fontSize='10' type='FontAwesome' style={style.iconLeft}/>
          <Input 
            containerStyle={style.containerStyle}
            inputStyle={style.inputChat}
          />
          <Icon name='camera' type='FontAwesome' style={style.iconRight} onPress />
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
