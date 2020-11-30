import React, { useEffect, useState } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import moment from 'moment'
import jwt_decode from "jwt-decode"
import {Icon, Thumbnail} from 'native-base';
import {SearchBar, Button} from 'react-native-elements';
import chatAction from '../redux/actions/chat';
import store from '../redux/store'
// import {API_URL} from '@env';
import SplashScreen from 'react-native-splash-screen'
import socket from '../helpers/socket';
import PushNotification from 'react-native-push-notification'
import {default as axios} from 'axios';
const API_URL = 'http://127.0.0.1:8080'

let tokenNotif = ''

PushNotification.configure({
  onRegister: function (token) {
    // console.log(`Token: ${JSON.stringify(token)}`)
    // store().store.setItem('TOKEN_NOTIF', JSON.stringify(token))
    // axios({
    //   headers: {Authorization: token ? `Bearer ${token}` : undefined},
    //   method: 'patch',
    //   url: `${API_URL}/notif`,
    //   token,
    // });
    return tokenNotif = token
  },
  onNotification: function (notif) {
    console.log(`Notif: ${notif}`)
    PushNotification.localNotification({
      channelId: 'notif',
      title: notif.title,
      message: notif.message,
      smallIcon: "ic_notification",
    })
  },
  onRegistrationError: function (err) {
    console.error(err.message, err)
  }
})

PushNotification.createChannel(
  {
    channelId: 'notif',
    channelName: 'Notif channel',
    channelDescription: 'Test',
    soundName: 'default',
    importance: 4,
    vibrate: true
  },
  (created) => console.log(`created channel return '${created}'`)
)

const Chat = ({navigation}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = useState(false);
  const chat = useSelector((state) => state.chat);
  const auth = useSelector((state) => state.auth);
  const idToken = jwt_decode(auth.token)
  const { id } = idToken.detailUser

  // console.log(tokenNotif)

  const getData = () => {
    dispatch(chatAction.getChat(auth.token))
  }

  useEffect(() => {
    SplashScreen.hide();
    dispatch(chatAction.setTokenNotif(auth.token, tokenNotif))
    dispatch(chatAction.getChat(auth.token));

    socket.on(id, ()=>{
      console.log(socket.id)
      console.log('socket on called')
      dispatch(chatAction.getChat(auth.token))
      // dispatch(chatAction.privateChat(auth.token, id_sender, id_receiver))
    })
    return()=>{
      socket.close()
    }
  }, []);

  const chatList = chat.data
  const today = moment(new Date()).format('DD/MM/YY')

  const chatRoom = (id_sender, id_receiver) => {
    dispatch(chatAction.privateChat(auth.token, id_sender, id_receiver))
    navigation.navigate('ChatRoom', {id_sender, id_receiver})
  };

  const newChat = () => {
    navigation.navigate('Contact')
  }
  const searchChat = () => {
    // console.log(search)
    setSearch('')
    dispatch(chatAction.searchChat(auth.token, search))
  }
  // const nextPage = () => {
  //   if (chat.pageInfo.nextLink!=='') {
  //     const nextPage = chat.pageInfo.nextLink.slice(21)
  //     dispatch(chatAction.nextPrevChat(auth.token, nextPage));
  //   }
  // };
  const renderItem = ({item}) => (
    <TouchableOpacity style={style.rowChat} onPress={()=>chatRoom(item.id_sender, item.id_receiver)} key={item.id}>
      <View style={style.thumbnailWrap}>
        {item.id_sender===idToken.detailUser.id ? (
          item.receiver.picture===null ? 
            (<Thumbnail source={require('../assets/5fa3e598894a4.jpg')} />) : 
            (<Thumbnail source={{uri: `${API_URL}/${item.receiver.picture}`}} />)
        ) : (
          item.sender.picture===null ? 
            (<Thumbnail source={require('../assets/5fa3e598894a4.jpg')} />) : 
            (<Thumbnail source={{uri: `${API_URL}/${item.sender.picture}`}} />)
        )}
      </View>
      <View style={style.centerTextContent}>
        {item.id_sender===idToken.detailUser.id && <Text style={style.sender}>{item.receiver.username}</Text>}
        {item.id_receiver===idToken.detailUser.id && <Text style={style.sender}>{item.sender.username}</Text>}
        <Text style={style.content}> 
          {item.message.length > 80
            ? item.message.slice(0, 81).concat('...')
            : item.message} 
        </Text>
      </View>
      <View style={{marginLeft: 'auto'}}>
        {today===moment(item.createdAt).format('DD/MM/YY') ? (
          <Text style={style.content}> {moment(item.createdAt).format('HH:mm')}</Text>
        ):(
        <Text style={style.content}>{moment(item.createdAt).format('DD/MM/YY')}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={style.parent}>
      <View style={style.rowDir}>
        <TouchableOpacity >
          <Text style={style.linked}>Edit</Text>
        </TouchableOpacity>
        <TouchableOpacity style={style.iconRight} onPress={newChat}>
          <Icon name="create" type="MaterialIcons" size={20} color="#0000cd" />
        </TouchableOpacity>
      </View>

      <View style={style.header}>
        <Text style={style.title}>Chat</Text>
      </View>
      
      <ScrollView>
        <SearchBar
          platform="ios"
          searchIcon={
            <Icon
              name="search"
              type="MaterialIcons"
              size={16}
              color="#808080"
            />
          }
          inputStyle={style.inputSearch}
          containerStyle={style.containerStyle}
          inputContainerStyle={style.inputcontainerStyle}
          cancelButtonProps={style.cancelButton}
          placeholder="Cari"
          onChangeText={(text) => setSearch(text)}
          value={search}
          onSubmitEditing={searchChat}
        />

        <View style={style.rowDir2}>
          <TouchableOpacity>
            <Text style={style.linked}>Daftar Siaran</Text>
          </TouchableOpacity>
          <TouchableOpacity style={style.iconRight}>
            <Text style={style.linked}>Grup Baru</Text>
          </TouchableOpacity>
        </View>
        {chatList.length > 0 ? (
          <FlatList
            data={chatList}
            renderItem={renderItem}
            keyExtractor={(item) => item.message}
            refreshing={loading}
            onRefresh={getData}
          />
        ) : (
          <View style={style.buttonWrapper}>
            <Button 
              raised
              title="Mulai chat baru"
              type="outline"
              containerStyle={style.containerStyleButton}
              buttonStyle={style.buttonStyle}
              onPress={newChat}
            />
          </View>
        )}
        {/* <FlatList
          data={chatList}
          renderItem={renderItem}
          keyExtractor={(item) => item.message}
          // numColumns={2}
          // onEndReached={nextPage}
          // onEndReachedThreshold={0.05}
          refreshing={loading}
          onRefresh={getData}
        /> */}
      </ScrollView>
    </View>
  );
};

export default Chat;

const style = StyleSheet.create({
  parent: {
    flex: 1,
    // marginTop: 25,
    padding: '3%',
    backgroundColor: 'white',
  },
  buttonWrapper: {
    flex: 1,
    // backgroundColor: 'yellow'
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
    height: '10%',
    // backgroundColor: 'yellow'
  },
  title: {
    fontWeight: 'bold',
    fontSize: 25,
  },
  inputSearch: {
    fontSize: 12,
  },
  containerStyle: {
    padding: 0,
  },
  inputcontainerStyle: {
    height: 25,
  },
  cancelButton: {
    color: 'grey',
  },
  rowDir2: {
    flexDirection: 'row',
    width: '100%',
    borderBottomWidth: 1,
    borderColor: '#dcdcdc',
    paddingBottom: 10,
    paddingTop: 10,
    // backgroundColor: 'yellow',
  },
  rowChat: {
    paddingVertical: '2%',
    flexDirection: 'row',
    height: 70,
    flex: 1,
    // backgroundColor: 'yellow',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#dcdcdc',
  },
  thumbnailWrap: {
    marginRight: 10,
  },
  centerTextContent: {
    // width: '100%',
  },
  sender: {
    fontWeight: '700',
    fontSize: 11,
  },
  content: {
    fontSize: 9,
    color: 'grey',
  },
  containerStyleButton: {
    width: '50%',
    height: 40,
    marginTop: '90%',
    marginBottom: 10,
    alignSelf: 'center',
  },
  buttonStyle: {
    width: '100%',
    height: '100%'
  },
});
