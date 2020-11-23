import React, { Component } from 'react'
import {View, StyleSheet, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, SafeAreaView} from 'react-native';
import {Thumbnail} from 'native-base'
import {Header, Input} from 'react-native-elements'
import Iconic from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

export default class ProfileUser extends Component {
  state={
    nama: 'Furoidah Chilmi',
    phone: '+62 813 2868 6883',
    picture: '',
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
      <KeyboardAvoidingView style={style.parent}>
        <Header 
          placement='center'
          backgroundColor='transparent'
          leftComponent={<Iconic onPress={this.register} name='chevron-left' color='#1e90ff' size={28} />}
          centerComponent={{ text: 'Edit Profile', style: { color: 'black' }, }}
        />

        <View style={style.viewTopWrapper}>
          <View style={style.viewTop}>
            <TouchableOpacity style={style.thumbWrapper} onPress={this.handleChoosePhoto}>
              <Thumbnail style={style.thum} source={require('../assets/5fa3e598894a4.jpg')} />
              <Text style={style.linked}>Edit</Text>
            </TouchableOpacity>
            <View style={style.textRight}>
              <Text style={style.greyText}>Masukkan nama Anda dan tambahkan foto profil (opsional)</Text>
            </View>
          </View>
          <View style={style.inputWrapper}> 
            {/* <Input 
              inputContainerStyle={{height: '100%'}}
              containerStyle={style.containerStyle}
              inputStyle={style.inputStyle0}
              value={this.state.nama}
              editable
              onChange={(text)=>this.setState({nama: text})}
            /> */}
            <TextInput
              value={this.state.nama}
              style={style.containerStyle}
              onChange={(text)=>this.setState({nama: text})}
              // onSubmitEditing={}
            />
          </View>
        </View>
        
        <View style={style.textWrapper}>
          <Text style={style.greyText}>NOMOR TELEPON</Text>
        </View>
        <View style={style.inputNumberWrapper}>
          <Text style={style.inputStyle0}>{this.state.phone}</Text>
        </View>

        <View style={style.textWrapper}>
          <Text style={style.greyText}>INFO</Text>
        </View>
        <TouchableOpacity style={style.inputInfoWrapper}>
          <Text style={style.info}>Sleeping</Text>
          <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
        </TouchableOpacity>



      </KeyboardAvoidingView>
    )
  }
}

const style = StyleSheet.create({
  parent: {
    flex: 1,
    // backgroundColor: 'tomato',
  },
  viewTopWrapper: {
    // paddingHorizontal: '3%',
    backgroundColor: 'white',
    height: '32%',
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
  },
  viewTop: {
    paddingHorizontal: '3%',
    paddingVertical: '5%',
    flexDirection: 'row'
  },
  thumbWrapper: {
    alignItems: 'center',
  },
  thum: {
    marginVertical: 5
  },
  linked: {
    color: '#1e90ff',
    fontSize: 12
  },
  textRight: {
    paddingLeft: 20,
    paddingRight: 50,
    paddingTop: '3%',
  },
  greyText: {
    fontSize: 10,
    color: 'grey',
  },
  containerStyle: {
    // backgroundColor: 'yellow',
    padding: '3%',
    // height: 30,
    borderBottomWidth: 0.5,
    borderColor: '#dcdcdc',
    fontSize: 12,
  },
  inputStyle0: {
    fontSize: 12,
  },
  inputWrapper: {
    height: 40,
    // backgroundColor: 'yellow',
    borderTopWidth: 0.5,
    borderColor: '#dcdcdc',
  },
  inputNumberWrapper: {
    height: 40,
    backgroundColor: 'white',
    justifyContent: 'center',
    padding: '3%',
  },
  containerStyle1: {
    // backgroundColor: 'tomato',
    // padding: 2,
    height: '100%',
    borderBottomWidth: 1,
    borderTopWidth: 1,
    // borderColor: 'grey',
  },
  textWrapper: {
    paddingHorizontal: '3%',
    marginTop: 25,
    marginBottom: 8
  },
  inputInfoWrapper: {
    height: 40,
    width: '100%',
    backgroundColor: 'white',
    paddingHorizontal: '3%',
    alignItems: 'center',
    flexDirection: 'row',
  },
  info: {
    fontSize: 12,
    width: '80%',
  },
  iconRight: {
    marginLeft: 'auto'
  },
})