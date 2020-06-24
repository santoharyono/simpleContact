import React, {useState, useEffect, useRef, useCallback} from 'react';
import {
  Alert,
  SafeAreaView,
  FlatList,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';
import {GetContacts} from '../APIs/contactAPI';
import {ItemList} from '../components/organisms';
import {Common} from '../styles';
import {RoundButton} from '../components/molecules';

const Contact = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getContacts();
  }, []);

  const getContacts = async () => {
    try {
      setRefreshing(true);
      const contactsAPI = await GetContacts();
      setContacts(contactsAPI.data);
      setRefreshing(false);
    } catch (error) {
      Alert.alert('Get contacts failed.');
    }
  };

  const onRefresh = () => {
    getContacts();
  };

  const goToDetail = (id) => {
    navigation.navigate('ContactDetail', {id, type: 'detail'});
  };

  return (
    <SafeAreaView style={Common.container}>
      <FlatList
        data={contacts}
        renderItem={({item}) => (
          <ItemList
            name={`${item.firstName} ${item.lastName}`}
            photo={item.photo}
            onPress={() => goToDetail(item.id)}
          />
        )}
        keyExtractor={(item) => item.id}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
      <View style={styles.roundButtonContainer}>
        <RoundButton
          onPress={() => navigation.navigate('ContactDetail', {type: 'create'})}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  roundButtonContainer: {
    position: 'absolute',
    right: '13%',
    bottom: '8%',
  },
});
export default Contact;
