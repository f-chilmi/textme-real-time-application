import React, { Component } from 'react'
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native'
import {Header, Input, Button} from 'react-native-elements'
import Iconic from 'react-native-vector-icons/MaterialIcons';4

export default class Verification extends Component {
  chat = () => {
    this.props.navigation.navigate('Chat')
  }
  
  render() {
    return (
      <SafeAreaView style={style.parent}>
        <Header
          backgroundColor="transparent"
          centerComponent={{ text: 'Verifikasi +62 813 2868 6883', style: { color: 'black', fontSize: 13 }, }}
          rightComponent={<Iconic onPress={this.register} name='more-vert' color='grey' size={28} />}
          centerContainerStyle={{flex: 5}}
        />
        
        <View style={style.rowDir}>
          <Text style={style.smallText}>
            Menunggu pendeteksian SMS secara otomatis yang telah dikirim ke 
            <Text style={style.textBlack}> +62 813 2868 6883 </Text>
            <Text style={style.linkedText}> Nomor salah?</Text>
          </Text>

          <View style={style.inputWrapper}>
            <Input 
              containerStyle={style.containerStyle}
              inputStyle={style.inputStyle0}
            />
            
            <Text style={style.smallText}>Masukkan kode 6 digit</Text>
          </View>

          <View style={style.wrapRow0}>
            <Iconic name="chat-bubble" size={23} color="grey" style={style.iconLeft} />
            <Text style={style.textGrey}>Kirim ulang SMS</Text>
          </View>
          <View style={style.wrapRow}>
            <Iconic name="phone" size={23} color="grey" style={style.iconLeft} />
            <Text style={style.textGrey}>Panggil saya</Text>
          </View>

        </View>

        <Button 
          raised
          title="Lanjut"
          type="outline"
          containerStyle={style.containerStyleButton}
          buttonStyle={style.buttonStyle}
          onPress={this.chat}
        />

      </SafeAreaView>
    )
  }
}

const style = StyleSheet.create({
  parent: {
    flex: 1,
    backgroundColor: 'white',
  },
  rowDir: {
    paddingTop: 10,
    alignItems: 'center',
    paddingHorizontal: '5%',
  },
  smallText: {
    fontSize: 11,
    color: 'grey',
    textAlign: 'center',
  },
  textBlack: {
    fontWeight: 'bold',
    fontSize: 11,
  },
  linkedText: {
    color: '#1e90ff',
    fontSize: 11,
  },
  inputWrapper: {
    width: '50%',
    marginBottom: 20
  },
  containerStyle: {
    // backgroundColor: 'yellow',
    marginTop: 10,
    height: 70,
  },
  inputStyle0: {
    fontSize: 11,
    textAlign: 'center',
  },
  inputStyle: {
    fontSize: 11,
    textAlign: 'center',
  },
  inputDir: {
    flexDirection: 'row',
  },
  containerStyleButton: {
    width: '30%',
    height: 40,
    marginTop: 'auto',
    marginBottom: 20,
    alignSelf: 'center',
  },
  buttonStyle: {
    width: '100%',
    height: '100%'
  },
  wrapRow: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'yellow',
    paddingVertical: 15,
  },
  wrapRow0: {
    flexDirection: 'row',
    width: '100%',
    // backgroundColor: 'yellow',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderColor: '#d3d3d3',
  },
  textGrey: {
    fontSize: 11,
    color: 'grey',
  },
  iconLeft: {
    paddingLeft: 5,
    marginRight: 20
  },
})