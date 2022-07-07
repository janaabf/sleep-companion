import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {
  buttons,
  colors,
  container,
  link,
  titles,
} from '../../styles/constants';

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
  error: {
    fontFamily: 'Comfortaa_400Regular',
    color: colors.pink,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

const { manifest } = Constants;

// connects automatically to the right api
const apiBaseUrl =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(`:`).shift()}:3000/api/register`
    : 'https://api.example.com';

export default function Register({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');
  const [errors, setErrors] = useState([]);

  async function registerHandler() {
    const registerResponse = await fetch(apiBaseUrl, {
      // use api from expo app on dev tools
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const registerResponseBody = await registerResponse.json();

    console.log('responseeee', registerResponseBody);

    // if user exists: error
    if ('errors' in registerResponseBody) {
      setErrors(registerResponseBody.errors);
      return;
    } else {
      navigation.push('Welcome');
      return;
    }
  }

  return (
    <SafeAreaView style={container}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={titles}>register</Text>
        </View>
        <Text style={styles.text}>e-mail</Text>
        <TextInput
          style={styles.input}
          textContentType="emailAddress"
          placeholder="e-mail"
          onChangeText={onChangeEmail}
          value={email}
        />
        <Text style={styles.text}>password</Text>

        <TextInput
          textContentType="password"
          secureTextEntry={true}
          style={styles.input}
          placeholder="password"
          onChangeText={onChangePassword}
          value={password}
        />
      </View>
      {errors.map((error) => (
        <Text style={styles.text} key={`error-${error.message}`}>
          {error.message}
        </Text>
      ))}
      <View style={styles.container}>
        <Pressable
          onPress={() => {
            registerHandler().catch((e) => {
              console.log(e);
            });
          }}
          style={buttons}
        >
          <Text style={styles.text}>register</Text>
        </Pressable>
        <Pressable onPress={() => navigation.navigate('Login')} style={link}>
          <Text style={link}>{'<'} login</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
