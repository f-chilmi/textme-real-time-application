import React, { Component } from 'react'
import {View, StyleSheet, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, ActivityIndicator, Modal, ToastAndroid} from 'react-native';
import {Thumbnail} from 'native-base'
import {Header} from 'react-native-elements'
import Iconic from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';
import auth from '../redux/actions/auth';
import users from '../redux/actions/users';
import {connect} from 'react-redux';
// import {API_URL} from '@env';
const API_URL = 'http://127.0.0.1:8080'

class ProfileUser extends Component {
  state={
    nama: '',
    phone: '',
    picture: '',
  }
  componentDidMount(){
    this.props.getUser(this.props.auth.token)
    const {data} = this.props.users
    this.setState({
      nama: data.username,
      picture: data.picture
    })
  }
  handleChoosePhoto = () => {
    const options = {
      mediaType: 'photo',
      maxWidth: 1000,
      maxHeight: 1000,
    };
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
        this.props.editPicture(this.props.auth.token, form);
        this.props.getUser(this.props.auth.token)
      }
    });
  };
  showToast = () => {
    ToastAndroid.show(this.props.users.alertMsg, ToastAndroid.SHORT);
  };
  saveEditName = () => {
    const data = { username: this.state.nama }
    // console.log(data)
    this.props.editUser(this.props.auth.token, data)
    this.props.getUser(this.props.auth.token)
  }
  render() {
    // console.log(this.state)
    console.log(this.props.users.alertMsg)
    const result = this.props.users.data
    // console.log(result)
    return (
      <KeyboardAvoidingView style={style.parent}>
        <Header 
          placement='center'
          backgroundColor='transparent'
          leftComponent={<Iconic onPress={this.register} name='chevron-left' color='#1e90ff' size={28} />}
          centerComponent={{ text: 'Edit Profile', style: { color: 'black' }, }}
        />
        {this.props.users.isLoading ? (
          <Modal visible transparent style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
            <ActivityIndicator style={{backgroundColor: 'white', opacity: 0.4, height: '100%', width: '100%'}} size="large" color="black" />
          </Modal>
        ) : (
          this.props.users.alertMsg === '' ? (null) : (this.showToast())
        )}

        <View style={style.viewTopWrapper}>
          <View style={style.viewTop}>
            <TouchableOpacity style={style.thumbWrapper} onPress={this.handleChoosePhoto}>
              {result.picture===null?(
                <Thumbnail style={style.thum} source={require('../assets/5fa3e598894a4.jpg')} />
              ) : (
                <Thumbnail source={{uri: `${API_URL}/${result.picture}`}} />
              )}
              <Text style={style.linked}>Edit</Text>
            </TouchableOpacity>
            <View style={style.textRight}>
              <Text style={style.greyText}>Masukkan nama Anda dan tambahkan foto profil (opsional)</Text>
            </View>
          </View>
          <View style={style.inputWrapper}> 
            <TextInput
              value={this.state.nama===null?'New user':this.state.nama}
              style={style.containerStyle}
              onChangeText={(text)=>this.setState({nama: text})}
              onSubmitEditing={this.saveEditName}
            />
          </View>
        </View>
        
        <View style={style.textWrapper}>
          <Text style={style.greyText}>NOMOR TELEPON</Text>
        </View>
        <View style={style.inputNumberWrapper}>
          <Text style={style.inputStyle0}> +62 {result.phone} </Text>
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

const mapStateToProps = (state) => ({
  auth: state.auth,
  users: state.users,
});

const mapDispatchToProps = {
  login: auth.auth,
  getUser: users.getUser,
  editUser: users.editUser,
  editPicture: users.editPicture,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileUser)

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