import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Fonts } from '../constants/fonts';
import { s } from '../utils/scale';
import Animated, { FadeInDown } from 'react-native-reanimated';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';

type SplashScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  'splashscreen'
>;

const SplashScreen = () => {
  const navigation = useNavigation<SplashScreenNavigationProp>();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('home');
    }, 2500);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar barStyle={'dark-content'} backgroundColor={'#FFFFFF'} />
      <Animated.Text entering={FadeInDown.duration(500)} style={styles.logo}>
        Expense Tracker
      </Animated.Text>
    </SafeAreaView>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    fontFamily: Fonts.INTER.bold,
    fontSize: s(40),
    color: '#000000',
  },
});
