import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Text,
  ScrollView,
  FlatList,
} from 'react-native';
import {Icon, Thumbnail} from 'native-base';
import {SearchBar} from 'react-native-elements';

const Chat = ({navigation}) => {
  const [search, setSearch] = React.useState('');
  const renderItem = ({item}) => (
    <TouchableOpacity style={style.rowChat} onPress={()=>navigation.navigate('ChatRoom')}>
      <View style={style.thumbnailWrap}>
        <Thumbnail source={require('../assets/5fa3e598894a4.jpg')} />
      </View>
      <View style={style.centerTextContent}>
        <Text style={style.sender}>Nama pengirim</Text>
        <Text style={style.content}>
          Isi chat sangat panjang Isi chat sangat panjang Isi chat sangat
          panjang Isi chat{' '}
        </Text>
      </View>
      <View>
        <Text style={style.content}>28/10/20</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={style.parent}>
      <View style={style.rowDir}>
        <TouchableOpacity>
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
          data={Array(30)}
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
