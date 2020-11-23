import React, {Component} from 'react';
import {View, StyleSheet, TouchableOpacity, ScrollView, Text, ImageBackground, TextInput} from 'react-native';
import Iconic from 'react-native-vector-icons/MaterialIcons';
import {Thumbnail} from 'native-base';
import {Header, Input} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';

export default class ChatRoom extends Component {
  state = {
    picture: '',
    chat: '',
  }
  register = () => {
    this.props.navigation.navigate('Register')
  }
  contactInfo = () => {
    this.props.navigation.navigate('ContactInfo')
  }
  handleChoosePhoto = () => {
    const options = {};
    ImagePicker.showImagePicker(options, (response) => {
      console.log(response);
      if (response.uri) {
        this.setState({picture: response});
        const form = new FormData();
        form.append('picture', {
          uri: String('file://'.concat(response.path)),
          type: response.type,
          name: response.fileName,
        });
        // this.props.updateImage(this.props.auth.token, form);
      }
    });
  };
  render() {
    return (
      <View style={style.parent}>
        <Header 
          placement="left"
          containerStyle={style.header}
          backgroundColor="#f5f5f5"
          leftComponent={
            <Iconic name='chevron-left' color='#1e90ff' size={28}/>
          }
          centerComponent={
            <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={this.contactInfo}>
              <Thumbnail small source={require('../assets/5fa3e598894a4.jpg')} />
              <Text style={{marginLeft: 10}}>Sender</Text>
            </TouchableOpacity>
          }
          rightComponent={
            <View style={{flexDirection: 'row'}}>
              <Iconic name='videocam' size={28} color='#1e90ff' />
              <Iconic name='call' size={25} color='#1e90ff' style={{marginLeft: 15}} />
            </View>
          }
        />

        <ImageBackground style={style.imageBackground} source={require('../assets/5fa3e598894a4.jpg')} >
          <ScrollView style={{padding: '3%'}}>
            <View style={style.chatReceive}>
              <Text style={style.textChat}>text yang sangat panjang </Text>
              <Text style={style.time}>18.00</Text>
            </View>
            <View style={style.chatSend}>
              <Text style={style.textChat}>text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang text yang sangat panjang </Text>
              <Text style={style.time}>18.01</Text>
            </View>
          </ScrollView>
        </ImageBackground>

        <View style={style.bottomWrapper}>
          <Iconic name='add' size={25} style={style.iconLeft} />
          {/* <Input 
            containerStyle={style.containerStyle}
            inputStyle={style.inputChat}
            inputContainerStyle={{height: '100%'}}
          /> */}
          <TextInput 
            style={style.containerStyle}
            multiline={true}
            onChangeText={(text)=>this.setState({chat: text})}
          />
          {this.state.chat === '' ? (
            <TouchableOpacity onPress={this.handleChoosePhoto} style={style.iconRight}>
              <Iconic name='camera-alt' size={25}  />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={style.iconRight}>
              <Iconic name='send' size={25} style={style.iconRight} />
            </TouchableOpacity>
          )}
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
  header: {
    height: 80,
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
    height: '90%',
    width: '79%',
    borderRadius: 30,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 10,
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
  chatReceive: {
    backgroundColor: 'yellow',
    width: '85%',
    padding: '2%',
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textChat: {
    fontSize: 11
  },
  chatSend: {
    marginLeft: 'auto',
    width: '80%',
    backgroundColor: 'tomato',
    padding: '2%',
    marginBottom: 15,
    backgroundColor: '#DCF8C6',
    borderRadius: 5,
  },
  imageBackground: {
    flex: 1
  },
  time: {
    fontSize: 8,
    color: 'grey',
    marginLeft: 'auto',
    marginTop: 5
  },
});
