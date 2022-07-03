import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttons, colors, container, link } from '../../styles/constants';
import Header from '../Header';

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
});

export default function Login({ route, navigation }) {
  const [email, onChangeEmail] = useState('');
  const [password, onChangePassword] = useState('');

  // const onRegisterHandler = async function registerHandler() {
  //   const registerResponse = await fetch('/api/register', {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username: email,
  //       password: password,
  //     }),
  //   });

  //   const registerResponseBody = await registerResponse.json();

  //   console.log(registerResponseBody);

  return (
    <SafeAreaView style={container}>
      <View style={styles.inputContainer}>
        <Header title="register" />
        <Text style={styles.text}>e-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="e-mail"
          onChangeText={onChangeEmail}
          value={email}
        />
        <Text style={styles.text}>password</Text>

        <TextInput
          style={styles.input}
          textContentType="password"
          placeholder="password"
          onChangeText={onChangePassword}
          value={password}
        />
      </View>
      <View style={styles.buttonsContainer}>
        <Pressable
          onPress={() => {
            // route.params.onRegisterHandler();
            navigation.navigate('Main');
          }}
          style={buttons}
        >
          <Text style={styles.text}>register</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
