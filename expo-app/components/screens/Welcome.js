import { Comfortaa_400Regular } from '@expo-google-fonts/comfortaa';
import { FontAwesome } from '@expo/vector-icons';
import Constants from 'expo-constants';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useCallback, useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { buttons, colors, container, link } from '../../styles/constants';
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
    alignSelf: 'center',
    justifyContent: 'center',
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  dropdown: {
    backgroundColor: colors.highlight,
  },
  profileIcon: {
    alignSelf: 'flex-end',
  },
});
const { manifest } = Constants;

// access api url
export const apiBaseUrl =
  typeof manifest.packagerOpts === `object` && manifest.packagerOpts.dev
    ? `http://${manifest.debuggerHost.split(`:`).shift()}:3000/api/logout`
    : 'https://api.example.com';

export default function Welcome({ navigation }) {
  const [appIsReady, setAppIsReady] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    async function prepare() {
      try {
        // Keep the splash screen visible while we fetch resources
        await SplashScreen.preventAutoHideAsync();

        // Pre-load fonts, make any API calls you need to do here
        await Font.loadAsync({ Comfortaa_400Regular });
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }
    prepare().catch((e) => console.log(e));
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately!
      // If we call this after `setAppIsReady`, then we may see a blank screen while the app is loading its initial state and rendering its first pixels.
      // So instead, we hide the splash screen once we know the root view has already performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return <View style={container} />;
  }
  return (
    <SafeAreaView style={container} onLayout={onLayoutRootView}>
      <View>
        <FontAwesome
          style={styles.profileIcon}
          name="user-circle"
          size={24}
          color="white"
          onPress={() => navigation.push('Profile')}
        />
        <Header title="welcome!" />
        <View style={styles.textContainer}>
          <Text style={styles.text}>
            No more snoozing! This is an alarm that forces you to get up. How?
            Once it the alarm rings, you need to go and find a barcode or
            QR-code to scan. {'\n'}Which one doesn't matter ;)
          </Text>
          <Text style={styles.text}>greetings {user.id}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.push('Alarm')} style={link}>
          <Text style={link}>Alarm page</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
