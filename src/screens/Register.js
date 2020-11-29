import React, { useEffect } from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, Text, TouchableOpacity, SafeAreaView} from 'react-native'
import {Header, Input, Button} from 'react-native-elements'
import Iconic from 'react-native-vector-icons/MaterialIcons';
import authAction from '../redux/actions/auth';
import SplashScreen from 'react-native-splash-screen'
import * as yup from 'yup'
import {Formik} from 'formik'

const Register = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(()=>{
    SplashScreen.hide();
  })

  // const verification = () => {
  //   const data = {phone};
  //   dispatch(authAction.setPhone(data))
  //   navigation.navigate('Verification');
  // }
  const signup = yup.object().shape({
    phone: yup.string()
      .min(9, 'Please insert a valid number')
      .max(13, 'Please insert a valid number')
      .required('Please insert your number'),
  });

    return (
      <SafeAreaView style={style.parent}>
        <Header
          backgroundColor="transparent"
          centerComponent={{ text: 'Masukkan nomor telepon Anda', style: { color: 'black', fontSize: 13 }, }}
          rightComponent={<Iconic name='more-vert' color='grey' size={28} />}
          centerContainerStyle={{flex: 5}}
        />

        <Formik 
          initialValues={{phone: ''}}
          validationSchema={signup}
          onSubmit={(value)=>{
            dispatch(authAction.setPhone(value))
            navigation.navigate('Verification');
          }}
        >
          {({handleChange, handleSubmit, values, errors})=>(
            <>
            <View style={style.rowDir}>
              <Text style={style.smallText}>TextMe akan mengirimkan SMS untuk memverifikasi nomor telepon Anda.<Text style={style.linkedText}> Berapa nomor saya?</Text></Text>

              <View style={style.inputWrapper}>
                <Input 
                  containerStyle={style.containerStyle}
                  inputStyle={style.inputStyle0}
                  value="Indonesia"
                />
                <View style={style.inputDir}>
                  <Input 
                    containerStyle={style.containerStyleLeft}
                    inputStyle={style.inputStyle}
                    value="+62"
                  />
                  {/* <Input 
                    containerStyle={style.containerStyleRight}
                    inputStyle={style.inputStyle}
                    onChangeText={(text)=>this.setState({phone: text})}
                  /> */}
                  <Input 
                    containerStyle={style.containerStyleRight}
                    inputStyle={style.inputStyle}
                    onChangeText={handleChange('phone')}
                    // value={values.phone}
                    onSubmitEditing={handleSubmit}
                    keyboardType='number-pad'
                  />
                </View>
                <Text style={style.smallText}>Biaya SMS operator telepon mungkin berlaku</Text>
              </View>

            </View>

            {errors.phone ? (
              <Text style={{color: 'red', textAlign: 'center', fontSize: 10}}>{errors.phone}</Text>
            ) : null}
            <Button 
              raised
              title="Lanjut"
              type="outline"
              onPress={handleSubmit}
              containerStyle={style.containerStyleButton}
              buttonStyle={style.buttonStyle}
            />
            </>
          )}
        </Formik>
      
      </SafeAreaView>
    )
}

export default Register

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