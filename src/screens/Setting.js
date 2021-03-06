import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
  ActivityIndicator
} from 'react-native';
import {Thumbnail} from 'native-base';
import {useSelector, useDispatch} from 'react-redux';
import Iconic from 'react-native-vector-icons/MaterialIcons';
import usersAction from '../redux/actions/users';
import authAction from '../redux/actions/auth';
import chatAction from '../redux/actions/chat';
import {API_URL} from '@env';
// const API_URL = 'http://127.0.0.1:8080'

const Setting = ({navigation}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const result = users.data
  useEffect(() => {
    dispatch(usersAction.getUser(auth.token))
  }, [dispatch]);

  const logout = () => {
    dispatch(authAction.logout())
    dispatch(chatAction.logout())
    dispatch(usersAction.logout())
  }
  
  // console.log(result)
  // console.log(users)
  return (
    <View style={style.parent}>
      <View style={style.header}>
        <Text style={style.title}>Setting</Text>
      </View>
      {Object.keys(result).length > 0 ? (
      <ScrollView>

        <TouchableOpacity style={style.rowChat} onPress={()=>navigation.navigate('ProfileUser')}>
          <View style={style.thumbnailWrap}>
            {result.picture===null ?
              <Thumbnail source={require('../assets/5fa3e598894a4.jpg')}/> :
              <Thumbnail source={{uri: `${API_URL}/${result.picture}`}}/>
            }
          </View>
          <View style={style.centerTextContent}>
            <Text style={style.sender}>{result.username===null?'New user':result.username}</Text>
            <Text style={style.content}>
              Sleeping
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.list}>
          <View style={{backgroundColor: '#ffa500', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="star" size={22} color="white" />
          </View>
          <View style={style.textWrapper}>
            <Text style={style.textList}>Pesan Berbintang</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.list1}>
          <View style={{backgroundColor: '#228b22', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="computer" size={22} color="white" />
          </View>
          <View style={style.textWrapper1}>
            <Text style={style.textList}>TextMe Web/Desktop</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.list}>
          <View style={{backgroundColor: '#0000ff', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="vpn-key" size={22} color="white" />
          </View>
          <View style={style.textWrapper}>
            <Text style={style.textList}>Akun</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.list1}>
          <View style={{backgroundColor: '#40e0d0', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="chat-bubble-outline" size={22} color="white" />
          </View>
          <View style={style.textWrapper}>
            <Text style={style.textList}>Chat</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.list1}>
          <View style={{backgroundColor: '#ff0000', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="notifications" size={22} color="white" />
          </View>
          <View style={style.textWrapper}>
            <Text style={style.textList}>Pemberitahuan</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.list1}>
          <View style={{backgroundColor: '#32cd32', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="sd-card" size={22} color="white" />
          </View>
          <View style={style.textWrapper1}>
            <Text style={style.textList}>Data dan Penyimpanan</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.list}>
          <View style={{backgroundColor: '#0000ff', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="info" size={22} color="white" />
          </View>
          <View style={style.textWrapper}>
            <Text style={style.textList}>Bantuan</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={style.list1}>
          <View style={{backgroundColor: '#ff0000', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="favorite" size={22} color="white" />
          </View>
          <View style={style.textWrapper1}>
            <Text style={style.textList}>Beri Tahu Teman</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={style.list} onPress={logout}>
          <View style={{backgroundColor: 'grey', borderRadius: 5, height: 30, width: 30, justifyContent: 'center', alignItems: 'center'}}>
            <Iconic name="power-settings-new" size={22} color="white" />
          </View>
          <View style={style.textWrapper1}>
            <Text style={style.textList}>Logout</Text>
            <Iconic name="keyboard-arrow-right" color="lightgrey" size={23}  style={style.iconRight} />
          </View>
        </TouchableOpacity>
      </ScrollView>
      ) : (
        <View style={{flex:1, justifyContent: 'center', alignItems: 'center',}}>
          <ActivityIndicator style={{backgroundColor: 'white', opacity: 0.4, height: '100%', width: '100%'}} size="large" color="black" />
        </View>
      )}
      
    </View>
  );
};

export default Setting;

const style = StyleSheet.create({
  parent: {
    flex: 1,
    marginTop: 25,
    // padding: '3%',
    // backgroundColor: 'white',
  },
  linked: {
    color: '#1e90ff',
  },
  rowDir: {
    flexDirection: 'row',
    width: '100%',
  },
  iconRight: {
    marginLeft: 'auto',
  },
  header: {
    // height: '10%',
    // backgroundColor: 'yellow',
    paddingTop: 25,
    paddingBottom: 10,
    padding: '3%',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  rowChat: {
    paddingVertical: '2%',
    flexDirection: 'row',
    height: 70,
    backgroundColor: 'white',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#dcdcdc',
    padding: '3%',
  },
  thumbnailWrap: {
    marginRight: 10,
  },
  centerTextContent: {
    width: 220,
    // backgroundColor: 'yellow',
  },
  sender: {
    // fontWeight: '700',
    fontSize: 13,
  },
  content: {
    fontSize: 10,
    color: 'grey',
  },
  centerTextContent: {
    width: 220,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  list: {
    marginTop: 40,
    backgroundColor: 'white',
    height: 45,
    alignItems: 'center',
    flexDirection: 'row',
    padding: '3%',
    borderTopWidth: 0.5,
    borderColor: '#dcdcdc',
  },
  list1: {
    // marginBottom: 40,
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
  iconRight: {
    marginLeft: 'auto'
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
});
