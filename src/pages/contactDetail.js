import React, {useRef, useState, useEffect} from 'react';
import {View, Alert, Image, Button, StyleSheet} from 'react-native';
import {Common} from '../styles';
import {
  DetailContact,
  CreateContact,
  UpdateContact,
  DeleteContact,
} from '../APIs/contactAPI';
import {CustomTextInput} from '../components/molecules';

const ContactDetail = ({navigation, route}) => {
  const isCanceled = useRef();
  const [contact, setContact] = useState({
    id: '',
    firstName: '',
    lastName: '',
    age: 0,
    photo: null,
  });
  const [editable, setEditable] = useState(true);
  useEffect(() => {
    const startup = async () => {
      const {id, type} = route.params;
      if (type === 'detail') {
        await getContactDetail(id);
      }
    };
    startup();
    return () => {
      isCanceled.current = true;
    };
  });

  const clearInput = () => {
    setContact({
      ...contact,
      firstName: '',
      lastName: '',
      age: '',
      photo: null,
    });
  };

  const onInputChange = (value, input) => {
    setContact({
      ...contact,
      [input]: value,
    });
  };

  const getContactDetail = async (contactId) => {
    try {
      const contactDetailResponse = await DetailContact(contactId);
      const {id, firstName, lastName, age, photo} = contactDetailResponse.data;
      if (!isCanceled.current && contactDetailResponse !== null) {
        setContact({
          ...contact,
          id,
          firstName,
          lastName,
          age,
          photo,
        });
        setEditable(false);
      }
    } catch (error) {
      Alert.alert('Get contact detail failed.');
    }
  };

  const createContact = () => {
    CreateContact(contact)
      .then((response) => {
        Alert.alert('Success', response.message, [
          {text: 'OK', onPress: () => navigation.navigate('Contact')},
        ]);
        clearInput();
      })
      .catch((error) => {
        Alert.alert(error.response.data.message);
      });
  };

  const updateContact = () => {
    UpdateContact(contact)
      .then((response) => {
        Alert.alert('Updated', response.message, [
          {text: 'OK', onPress: () => navigation.navigate('Contact')},
        ]);
      })
      .catch((error) => {
        console.log('update error', error);
      });
  };

  const deleteContact = () => {
    console.log('contact id', contact.id);
    DeleteContact(contact.id)
      .then((response) => {
        Alert.alert('Deleted', response.message, [
          {text: 'OK', onPress: () => navigation.navigate('Contact')},
        ]);
      })
      .catch((error) => {
        console.log('delete error', error);
      });
  };

  const getPhoto = () => {
    setContact({
      ...contact,
      photo:
        'http://vignette1.wikia.nocookie.net/lotr/images/6/68/Bilbo_baggins.jpg/revision/latest?cb=20130202022550',
    });
  };

  return (
    <View style={[Common.container, styles.container]}>
      {route.params.type === 'create' ? (
        <Button onPress={() => getPhoto()} title="get photo" />
      ) : (
        <Image
          source={
            contact.photo !== 'N/A'
              ? {uri: contact.photo}
              : require('../assets/icons/person.png')
          }
          style={styles.image}
        />
      )}
      <CustomTextInput
        value={contact.firstName}
        placeholder="First Name"
        onChangeText={(value) => onInputChange(value, 'firstName')}
        editable={editable}
      />
      <CustomTextInput
        value={contact.lastName}
        placeholder="Last Name"
        onChangeText={(value) => onInputChange(value, 'lastName')}
        editable={editable}
      />
      <CustomTextInput
        value={contact.age.toString()}
        placeholder="Age"
        onChangeText={(value) => onInputChange(value, 'age')}
        editable={editable}
      />
      {editable === false ? (
        <>
          <Button title="Edit" onPress={() => setEditable(true)} />
          <Button title="Delete" onPress={() => deleteContact()} />
        </>
      ) : route.params.type === 'create' ? (
        <Button title="Submit" onPress={() => createContact()} />
      ) : (
        <>
          <Button title="Save" onPress={() => updateContact()} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    margin: '10%',
  },
  image: {
    width: 100,
    height: 100,
  },
});
export default ContactDetail;
