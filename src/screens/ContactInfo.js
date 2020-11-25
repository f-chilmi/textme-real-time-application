import React, { Component } from 'react'
import {View, StyleSheet, Text, TouchableOpacity, Image, ScrollView} from 'react-native';
import {Thumbnail} from 'native-base'
import {Header, Input} from 'react-native-elements'
import Iconic from 'react-native-vector-icons/MaterialIcons'
import auth from '../redux/actions/auth';
import chat from '../redux/actions/chat'
import {connect} from 'react-redux';
import {API_URL} from '@env';
import jwt_decode from "jwt-decode"

class ContactInfo extends Component {
  state = {
    nama: 'Furoidah Chilmi',
    phone: '+62 813 2868 6883'
  }
  render() {
    const { user1, user2 } = this.props.chat
    const idToken = jwt_decode(this.props.auth.token)
    console.log(this.props)
    return (
      <View style={style.parent}>
        <Header 
          placement='center'
          backgroundColor='transparent'
          leftComponent={<Iconic name='chevron-left' color='#1e90ff' size={28} />}
          centerComponent={{ text: 'Info Kontak', style: { color: 'black' }, }}
          rightComponent={{ text: 'Edit', style: { color: '#1e90ff' }, }}
        />

        <ScrollView>
          <View style={style.imageWrapper}>
          {user1.id===idToken.detailUser.id ? (
              user2.picture===null ? 
                (<Thumbnail style={style.image} source={require('../assets/5fa3e598894a4.jpg')} />) : 
                (<Thumbnail style={style.image} source={{uri: `${API_URL}/${user2.picture}`}} />)
            ) : (
              user1.picture===null ? 
                (<Thumbnail small source={require('../assets/5fa3e598894a4.jpg')} />) : 
                (<Thumbnail style={style.image} source={{uri: `${API_URL}/${user1.picture}`}} />)
            )}
            {/* <Image source={require('../assets/5fa3e598894a4.jpg')} style={style.image}/> */}
          </View>

          <View style={style.info}>
            <View>
              {user1.id===idToken.detailUser.id && <Text style={style.name}>{user2.username}</Text>}
              {user2.id===idToken.detailUser.id && <Text style={style.name} >{user1.username}</Text>}

              {user1.id===idToken.detailUser.id && <Text style={style.phone}>+62 {user2.phone}</Text>}
              {user2.id===idToken.detailUser.id && <Text style={style.phone} >+62 {user1.phone}</Text>}
              {/* <Text style={style.name}>{this.state.nama}</Text>
              <Text style={style.phone}>{this.state.phone}</Text> */}
            </View>
            <View style={style.icons}>
              <View style={style.iconWrap}>
                <Iconic name='chat-bubble' size={18} color='#1e90ff' />
              </View>
              <View style={style.iconWrap}>
                <Iconic name='videocam' size={18} color='#1e90ff' />
              </View>
              <View style={style.iconWrap}>
                <Iconic name='call' size={18} color='#1e90ff' />
              </View>
            </View>
          </View>

          <View style={style.info1}>
            <Text style={style.status}>Sleeping</Text>
            <Text style={style.date}>31 Jul 2020</Text>
          </View>

        <TouchableOpacity style={style.list}>
          <View style={{backgroundColor: '#1e90ff', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="insert-photo" size={22} color="white" />
          </View>
          <View style={style.textWrapper}>
            <Text style={style.textList}>Media, Tautan, dan Dok</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.list1}>
          <View style={{backgroundColor: '#ffa500', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="star" size={22} color="white" />
          </View>
          <View style={style.textWrapper}>
            <Text style={style.textList}>Pesan Berbintang</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.list2}>
          <View style={{backgroundColor: '#ff8c00', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="search" size={22} color="white" />
          </View>
          <View style={style.textWrapper1}>
            <Text style={style.textList}>Cari Chat</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.list}>
          <View style={{backgroundColor: '#008000', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="volume-up" size={22} color="white" />
          </View>
          <View style={style.textWrapper}>
            <Text style={style.textList}>Bisukan</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.list1}>
          <View style={{backgroundColor: '#ff69b4', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="audiotrack" size={22} color="white" />
          </View>
          <View style={style.textWrapper}>
            <Text style={style.textList}>Nada Khusus</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.list2}>
          <View style={{backgroundColor: '#ffa500', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="save" size={22} color="white" />
          </View>
          <View style={style.textWrapper1}>
            <Text style={style.textList}>Simpan ke Rol Kamera</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.info2}>
          <Text style={style.status1}>Bersihkan Chat</Text>
        </TouchableOpacity>

        </ScrollView>

      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  chat: state.chat
});

const mapDispatchToProps = {
  login: auth.auth,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactInfo)

const style = StyleSheet.create({
  parent: {
    flex: 1,
    // backgroundColor: 'yellow'
  },
  imageWrapper: {
    height: 330
  },
  image: {
    height: '100%',
    width: '100%',
  },
  name: {
    fontSize: 12
  },
  phone: {
    fontSize: 9,
    color: 'grey'
  },
  info: {
    padding: 10,
    flexDirection: 'row',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc'
  },
  iconWrap: {
    backgroundColor: '#dcdcdc',
    borderRadius: 30,
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  icons: {
    marginLeft: 'auto',
    flexDirection: 'row',
  },
  info1: {
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc'
  },
  info2 : {
    marginTop: 20,
    marginBottom: 20,
    padding: 10,
    backgroundColor: 'white',
    borderBottomWidth: 0.5,
    borderTopWidth: 0.5,
    borderColor: '#dcdcdc'
  },
  status: {
    fontSize: 10
  },
  status1: {
    fontSize: 10,
    color: 'red'
  },
  date: {
    fontSize: 10,
    color: 'grey',
  },
  list: {
    marginTop: 20,
    backgroundColor: 'white',
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    padding: '3%',
    borderTopWidth: 0.5,
    borderColor: '#dcdcdc',
  },
  list1: {
    // marginTop: 40,
    backgroundColor: 'white',
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    padding: '3%',
    // borderTopWidth: 0.5,
    // borderColor: '#dcdcdc',
  },
  list2: {
    // marginTop: 40,
    backgroundColor: 'white',
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    padding: '3%',
    borderBottomWidth: 0.5,
    borderColor: '#dcdcdc',
  },
  textList: {
    fontSize: 11,
  },
  textWrapper: {
    marginLeft: 15,
    borderBottomWidth: 0.5,
    borderColor: '#dcdcdc',
    // backgroundColor: 'yellow',
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%'
  },
  textWrapper1: {
    marginLeft: 15,
    // borderBottomWidth: 0.5,
    // borderColor: '#dcdcdc',
    // backgroundColor: 'yellow',
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    width: '90%'
  },
  iconRight: {
    marginLeft: 'auto'
  },
})