import React, {useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux';
import {View, StyleSheet, TouchableOpacity, ScrollView, Text, ImageBackground, TextInput, FlatList} from 'react-native';
import Iconic from 'react-native-vector-icons/MaterialIcons';
import jwt_decode from "jwt-decode"
import moment from 'moment'
import {Thumbnail} from 'native-base';
import {Header} from 'react-native-elements';
import ImagePicker from 'react-native-image-picker';
import chatAction from '../redux/actions/chat';
import {API_URL} from '@env';

const ChatRoom = ({navigation, route}) => {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  const chat = useSelector((state) => state.chat);
  
  const idToken = jwt_decode(auth.token)
  const chatList = chat.detail
  const { user1, user2 } = chat
  const today = moment(new Date()).format('DD/MM/YY')

  const [picture, setPicture] = React.useState('');
  const [content, setContent] = React.useState('');

  const {id_receiver, id_sender} = route.params
  const [idReceiver, setReceiver] = React.useState('')

  if(id_sender===idToken.detailUser.id){
    if(idReceiver===id_receiver){
      console.log('receiver updated')
    } else {
      setReceiver(id_receiver)
    }
    
  } else {
    if(idReceiver===id_sender){
      console.log('receiver updated')
    } else {
      setReceiver(id_sender)
    }
  }


  // useEffect(() => {
  //   dispatch(chatAction.privateChat(auth.token, idToken.detailUser.id, id_receiver))
  // }, [dispatch]);

  const contactInfo = () => {
    navigation.navigate('ContactInfo')
  }
  const handleChoosePhoto = () => {
    const options = {};
    ImagePicker.showImagePicker(options, (response) => {
      console.log(response);
      if (response.uri) {
        setPicture(response);
        const form = new FormData();
        form.append('picture', {
          uri: String('file://'.concat(response.path)),
          type: response.type,
          name: response.fileName,
        });
        // updateImage(this.props.auth.token, form);
      }
    });
  };
  const dataSend = {id_receiver: idReceiver, chat: content}
  const sendChat = () => {
    setContent('')
    dispatch(chatAction.sendChat(auth.token, dataSend))
    refreshChatList()
  }

  const refreshChatList = () => {
    dispatch(chatAction.getChat(auth.token))
  }

  const renderItem = ({item}) => (
    item.id_sender===idToken.detailUser.id ? (
      <View style={style.chatSend}>
        <Text style={style.textChat}> {item.message} </Text>
        {today===moment(item.createdAt).format('DD/MM/YY') ? (
          <Text style={style.time}> {moment(item.createdAt).format('HH:mm')} </Text>
        ):(
        <Text style={style.time}>{moment(item.createdAt).format('DD/MM/YY HH:mm')}</Text>
        )}
      </View>
    ) : (
      <View style={style.chatReceive}>
        <Text style={style.textChat}> {item.message} </Text>
        {today===moment(item.createdAt).format('DD/MM/YY') ? (
          <Text style={style.time}> {moment(item.createdAt).format('HH:mm')} </Text>
        ):(
        <Text style={style.time}>{moment(item.createdAt).format('DD/MM/YY HH:mm')}</Text>
        )}
      </View>
    )
  );

  return(
    <View style={style.parent}>
      <Header 
        placement="left"
        containerStyle={style.header}
        backgroundColor="#f5f5f5"
        leftComponent={
          <Iconic name='chevron-left' color='#1e90ff' size={28}/>
        }
        centerComponent={
          <TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}} onPress={contactInfo}>
            {user1.id===idToken.detailUser.id ? (
              user2.picture===null ? 
                (<Thumbnail small source={require('../assets/5fa3e598894a4.jpg')} />) : 
                (<Thumbnail small source={{uri: `${API_URL}/${user2.picture}`}} />)
            ) : (
              user1.picture===null ? 
                (<Thumbnail small source={require('../assets/5fa3e598894a4.jpg')} />) : 
                (<Thumbnail small source={{uri: `${API_URL}/${user1.picture}`}} />)
            )}

            {user1.id===idToken.detailUser.id && <Text style={{marginLeft: 10}}>{user2.username}</Text>}
            {user2.id===idToken.detailUser.id && <Text style={{marginLeft: 10}} >{user1.username}</Text>}
          </TouchableOpacity>
        }
        rightComponent={
          <View style={{flexDirection: 'row'}}>
            <Iconic name='videocam' size={28} color='#1e90ff' />
            <Iconic name='call' size={25} color='#1e90ff' style={{marginLeft: 15}} />
          </View>
        }
      />

      <ImageBackground style={style.imageBackground} source={require('../assets/5fa3e598894a4.jpg')} >
        <ScrollView style={{padding: '3%'}}>
          <FlatList
            data={chatList}
            renderItem={renderItem}
            keyExtractor={(item) => item.message}
            inverted
          />
        </ScrollView>
      </ImageBackground>

      <View style={style.bottomWrapper}>
        <Iconic name='add' size={25} style={style.iconLeft} />
        <TextInput 
          style={style.containerStyle}
          multiline={true}
          onChangeText={(text)=>setContent(text)}
          value={content}
        />
        {content === '' ? (
          <TouchableOpacity onPress={handleChoosePhoto} style={style.iconRight}>
            <Iconic name='camera-alt' size={25}  />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={style.iconRight} onPress={sendChat}>
            <Iconic name='send' size={25} style={style.iconRight} />
          </TouchableOpacity>
        )}
      </View>


    </View>
  )


}

export default ChatRoom

const style = StyleSheet.create({
  parent: {
    flex: 1,
    // padding: '3%',
    backgroundColor: 'white',
  },
  header: {
    height: 80,
  },
  bottomWrapper: {
    height: 40,
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginTop: 'auto',
  },
  containerStyle: {
    backgroundColor: 'white',
    height: '90%',
    width: '79%',
    borderRadius: 30,
    borderColor: '#d3d3d3',
    borderWidth: 1,
    paddingLeft: 10,
    fontSize: 10,
    padding: 0,
    // justifyContent: 'center',
  },
  iconLeft: {
    marginRight: 8
  },
  iconRight: {
    marginLeft: 'auto'
  },
  inputChat: {
    fontSize: 10,
  },
  chatReceive: {
    backgroundColor: 'yellow',
    width: '85%',
    padding: '2%',
    marginBottom: 15,
    backgroundColor: 'white',
    borderRadius: 5,
  },
  textChat: {
    fontSize: 11
  },
  chatSend: {
    marginLeft: 'auto',
    width: '80%',
    backgroundColor: 'tomato',
    padding: '2%',
    marginBottom: 15,
    backgroundColor: '#DCF8C6',
    borderRadius: 5,
  },
  imageBackground: {
    flex: 1
  },
  time: {
    fontSize: 8,
    color: 'grey',
    marginLeft: 'auto',
    marginTop: 5
  },
});
