import { StyleSheet, Text, View } from 'react-native';
import React, { ReactElement } from 'react';
import { ms, s } from '../utils/scale';
import { Fonts } from '../constants/fonts';

type HeaderProps = {
  left: ReactElement;
  title: string;
  right?: ReactElement;
};

const Header = ({ left, title, right = <></> }: HeaderProps) => {
  return (
    <View style={styles.container}>
      <View>{left && left}</View>
      <Text style={styles.headerTxt}>{title}</Text>
      <View>{right && right}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: s(16),
  },
  headerTxt: {
    fontFamily: Fonts.INTER.semiBold,
    fontSize: ms(24),
    color: '#000000',
    paddingRight: s(20),
  },
});
