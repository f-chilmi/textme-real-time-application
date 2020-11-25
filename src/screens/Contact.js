import React, {useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import {Thumbnail, Icon} from 'native-base';
import {Header, SearchBar} from 'react-native-elements'
import {useSelector, useDispatch} from 'react-redux';
import usersAction from '../redux/actions/users';
import {API_URL} from '@env';

const Contact = ({navigation}) => {
  const [search, setSearch] = React.useState('');
  const auth = useSelector((state) => state.auth);
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(usersAction.getAllUser(auth.token))
  }, [dispatch]);

  const {result} = users.allUser
  console.log(result)

  const renderItem = ({item}) => (
    <TouchableOpacity style={style.wrapper}>
      {console.log(item)}
      {item.picture===null?(
        <Thumbnail style={style.photo} source={require('../assets/5fa3e598894a4.jpg')} />
      ) : (
        <Thumbnail style={style.photo} source={{uri: `${API_URL}/${item.picture}`}} />
      )}
      {/* <Thumbnail style={style.photo} source={require('../assets/5fa3e598894a4.jpg')} /> */}
      <View style={style.nameWrapper}>
        <Text style={style.textName}>{item.username!==''?item.username:'New user'}</Text>
        <Text style={style.phone}>+62 {item.phone}</Text>
      </View>
    </TouchableOpacity>
  );

  return(
    <View style={style.parent}>
      <Header
          backgroundColor="transparent"
          centerComponent={<Text style={style.textHeader}>Chat Baru</Text>}
          rightComponent={<Text style={style.linked}>Batal</Text>}
        />
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

          <FlatList 
            data={result}
            renderItem={renderItem}
            keyExtractor={(item) => item}
          />       
        
    </View>
  )

}

export default Contact

const style = StyleSheet.create({
  parent: {
    flex: 1,
    // backgroundColor: 'white',
  },
  textHeader: {
    fontSize: 13,
    fontWeight: 'bold',
  },
  linked: {
    color: '#1e90ff',
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
  content: {
    backgroundColor: 'yellow',
    flex: 1
  },
  wrapper: {
    flexDirection: 'row',
    paddingHorizontal: '3%',
    // paddingVertical: '3%',
    backgroundColor: 'white',
    height: 60,
  },
  photo: {
    width: 46,
    height: 46,
    alignSelf: 'center',
  },
  nameWrapper: {
    marginLeft: 15,
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    borderColor:'#dcdcdc',
    height: '100%',
    width: '100%',
    // flexDirection: 'row',
    justifyContent: 'center',
  },
  textName: {
    fontSize: 12,
    marginBottom: 5
  },
  phone: {
    fontSize: 9,
    color: 'grey',
  },
})