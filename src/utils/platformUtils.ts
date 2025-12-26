import { Dimensions, Platform } from 'react-native';

export const isIos = () => {
  return Platform.OS === 'ios';
};

export const isAndroid = () => {
  return Platform.OS === 'android';
};

export const hp = (num: number) => {
  return (Dimensions.get('window').height * num) / 100;
};

export const wp = (num: number) => {
  return (Dimensions.get('window').width * num) / 100;
};
