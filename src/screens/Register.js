import React, { Component } from 'react'
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native'
import {Header, Input, Button} from 'react-native-elements'
import Iconic from 'react-native-vector-icons/MaterialIcons';4

export default class Register extends Component {
  render() {
    return (
      <SafeAreaView style={style.parent}>
        <Header
          backgroundColor="transparent"
          centerComponent={{ text: 'Masukkan nomor telepon Anda', style: { color: 'black', fontSize: 13 }, }}
          rightComponent={<Iconic onPress={this.register} name='more-vert' color='grey' size={28} />}
          centerContainerStyle={{flex: 5}}
        />
        
        <View style={style.rowDir}>
          <Text style={style.smallText}>TextMe akan mengirimkan SMS untuk memverifikasi nomor telepon Anda.<Text style={style.linkedText}> Berapa nomor saya?</Text></Text>

          <View style={style.inputWrapper}>
            <Input 
              containerStyle={style.containerStyle}
              inputStyle={style.inputStyle0}
            />
            <View style={style.inputDir}>
              <Input 
                containerStyle={style.containerStyleLeft}
                inputStyle={style.inputStyle}
              />
              <Input 
                containerStyle={style.containerStyleRight}
                inputStyle={style.inputStyle}
              />
            </View>
            <Text style={style.smallText}>Biaya SMS operator telepon mungkin berlaku</Text>
          </View>

        </View>

        <Button 
          raised
          title="Lanjut"
          type="outline"
          containerStyle={style.containerStyleButton}
          buttonStyle={style.buttonStyle}
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
  },
  smallText: {
    fontSize: 11,
    color: 'grey',
    textAlign: 'center',
  },
  linkedText: {
    color: '#1e90ff',
    fontSize: 11,
  },
  inputWrapper: {
    width: '70%',
  },
  containerStyle: {
    // backgroundColor: 'yellow',
    // padding: 2,
    height: 50,
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
  containerStyleLeft: {
    width: '25%',
    // backgroundColor: 'grey',
    height: 60,
  },
  containerStyleRight: {
    width: '75%',
    // backgroundColor: 'yellow',
    height: 60,
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
})