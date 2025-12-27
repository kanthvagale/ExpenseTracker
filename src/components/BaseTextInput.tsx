import {
  Pressable,
  StyleSheet,
  TextInput,
} from 'react-native';
import React, { ReactElement } from 'react';
import { ms, s } from '../utils/scale';
import { Fonts } from '../constants/fonts';

type BaseTextInputProps = {
  left?: ReactElement;
  placeholder: string;
  right?: ReactElement;
  value: string;
  setValue?: React.Dispatch<React.SetStateAction<string>>;
  disable?: boolean;
  onPress?: () => void;
};

const BaseTextInput = ({
  left,
  placeholder = '',
  right,
  value,
  setValue = () => {},
  disable = false,
  onPress = () => {},
}: BaseTextInputProps) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      {left && left}
      <TextInput
        value={value}
        onChangeText={setValue}
        placeholder={placeholder}
        placeholderTextColor={'#9AA8BC'}
        style={styles.input}
        editable={!disable}
      />
      {right && right}
    </Pressable>
  );
};

export default BaseTextInput;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: s(16),
    backgroundColor: '#FFFFFF',
    height: s(56),
    alignItems: 'center',
    flexDirection: 'row',
    borderRadius: s(16),
    borderWidth: s(2),
    borderColor: '#E2E8F0',
    gap: s(8),
  },
  input: {
    flex: 1,
    fontFamily: Fonts.INTER.semiBold,
    fontSize: ms(16),
    color: '#000000',
  },
});
