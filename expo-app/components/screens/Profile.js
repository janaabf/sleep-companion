import Constants from 'expo-constants';
import React, { useContext, useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  back,
  buttons,
  colors,
  container,
  link,
  titles,
} from '../../styles/constants';
import Header from '../Header';
import { UserContext } from '../util/Context';

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.black,
    height: 40,
    width: 300,
    marginBottom: 20,
    borderWidth: 1,
    padding: 10,
    backgroundColor: colors.white,
    borderRadius: 10,
  },
  text: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.white,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonsContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdown: {
    backgroundColor: colors.highlight,
  },
});

const { manifest } = Constants;

// access api url
export const apiBaseUrl =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(`:`).shift()}:3000/api/logout`
    : 'https://api.example.com';

export default function UserProfile({ navigation }) {
  const [username, onChangeUsername] = useState('');
  const [sleepTime, onChangeSleepTime] = useState('');
  const { setUser } = useContext(UserContext);

  // logout function
  async function logoutHandler() {
    // fetch userinfo from database
    await fetch(apiBaseUrl, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setUser(null);
  }

  return (
    <SafeAreaView style={container}>
      <View>
        <TouchableOpacity onPress={() => navigation.push('Welcome')}>
          <Text style={back}>{'<'} back</Text>
        </TouchableOpacity>
        <Header title="profile" />

        {/* <View style={styles.headerContainer}>
          <Text style={titles}>profile</Text>
        </View> */}
        <Text style={styles.text}>Please enter your information:</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.text}>name:</Text>
          <TextInput
            style={styles.input}
            textContentType="username"
            placeholder="how should we call you?"
            onChangeText={onChangeUsername}
            value={username}
          />
          <Text style={styles.text}>desired hours of sleep:</Text>
          <TextInput
            style={styles.input}
            placeholder="e.g. 7.5"
            onChangeText={onChangeSleepTime}
            value={sleepTime}
          />
        </View>
        <TouchableOpacity style={buttons}>
          <Text style={styles.text}>save changes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            logoutHandler().catch((e) => {
              console.log(e);
            });
          }}
        >
          <Text style={link}>logout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
