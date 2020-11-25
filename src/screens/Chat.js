import React, { useEffect } from 'react';
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
import usersAction from '../redux/actions/users';

const Chat = ({navigation}) => {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState('');
  const chat = useSelector((state) => state.chat);
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  useEffect(() => {
    dispatch(chatAction.getChat(auth.token))
    dispatch(usersAction.getAllUser(auth.token))
  }, [dispatch]);

  const chatList = chat.data.chat
  const today = moment(new Date()).format('DD/MM/YY')
  const hour = moment(chat.data.createdAt).format('hh:mm')

  const chatRoom = (id_sender, id_receiver) => {
    dispatch(chatAction.privateChat(auth.token, id_sender, id_receiver))
    navigation.navigate('ChatRoom', {id_sender, id_receiver})
  };
  const logout = () => {
    dispatch(authAction.logout())
  }
  const idToken = jwt_decode(auth.token)
  console.log(idToken.detailUser.id)
  console.log(auth)
  console.log(users)
  const renderItem = ({item}) => (
    <TouchableOpacity style={style.rowChat} onPress={()=>chatRoom(item.id_sender, item.id_receiver)} key={item.id.toString().concat(item.message)}>
      <View style={style.thumbnailWrap}>
        <Thumbnail source={require('../assets/5fa3e598894a4.jpg')} />
      </View>
      <View style={style.centerTextContent}>
        <Text style={style.sender}>Nama pengirim</Text>
        <Text style={style.content}> 
          {item.message.length > 80
            ? item.message.slice(0, 81).concat('...')
            : item.message} 
        </Text>
      </View>
      <View>
        {today===moment(item.createdAt).format('DD/MM/YY') ? (
          <Text style={style.content}> {hour}</Text>
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
        <TouchableOpacity style={style.iconRight}>
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
          onChangeText={() => setSearch(text)}
          value={search}
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
          keyExtractor={(item) => item}
          // numColumns={2}
          // onEndReached={nextPage}
          // onEndReachedThreshold={0.5}
          // refreshing={loading}
          // onRefresh={() => dispatch(homeAction.refreshCatalog())}
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
