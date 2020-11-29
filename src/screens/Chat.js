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
import {SearchBar} from 'react-native-elements';
import chatAction from '../redux/actions/chat';
import authAction from '../redux/actions/auth';
import {API_URL} from '@env';
import SplashScreen from 'react-native-splash-screen'
import socket from '../helpers/socket';

const Chat = ({navigation}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState('');
  const [loading, setLoading] = useState(false);
  const [sender, setSender] = useState('')
  const [receiver, setReceiver] = useState('')
  const chat = useSelector((state) => state.chat);
  const auth = useSelector((state) => state.auth);
  const idToken = jwt_decode(auth.token)
  const { id } = idToken.detailUser

  const getData = () => {
    dispatch(chatAction.getChat(auth.token))
  }

  useEffect(() => {
    SplashScreen.hide();
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
  console.log(chatList)
  const today = moment(new Date()).format('DD/MM/YY')

  const chatRoom = (id_sender, id_receiver) => {
    dispatch(chatAction.privateChat(auth.token, id_sender, id_receiver))
    navigation.navigate('ChatRoom', {id_sender, id_receiver})
  };
  const logout = () => {
    dispatch(authAction.logout())
  }
  const newChat = () => {
    navigation.navigate('Contact')
  }
  const searchChat = () => {
    console.log(search)
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
      <View>
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
        <TouchableOpacity onPress={logout}>
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
        <FlatList
          data={chatList}
          renderItem={renderItem}
          keyExtractor={(item) => item.message}
          // numColumns={2}
          // onEndReached={nextPage}
          // onEndReachedThreshold={0.05}
          refreshing={loading}
          onRefresh={getData}
        />
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
    // backgroundColor: 'yellow',
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor: '#dcdcdc',
  },
  thumbnailWrap: {
    marginRight: 10,
  },
  centerTextContent: {
    width: 220,
    // backgroundColor: 'yellow',
  },
  sender: {
    fontWeight: '700',
    fontSize: 11,
  },
  content: {
    fontSize: 9,
    color: 'grey',
  },
});
