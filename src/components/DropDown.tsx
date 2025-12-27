import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import BaseTextInput from './BaseTextInput';
import { Icons } from '../assets/svg/Index';
import { CategoryListItems } from '../constants/types';
import Animated, { FadeInUp } from 'react-native-reanimated';
import { s } from '../utils/scale';
import { Fonts } from '../constants/fonts';

type DropDownProps = {
  items: CategoryListItems[];
  setItems: React.Dispatch<React.SetStateAction<CategoryListItems[]>>;
  value: string;
  setValue: React.Dispatch<React.SetStateAction<any>>;
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

const DropDown = ({
  items,
  setItems,
  value,
  setValue,
  show,
  setShow,
}: DropDownProps) => {
  return (
    <View>
      <BaseTextInput
        left={<Icons.BillIcon width={20} height={20} stroke={'#0081EE'} />}
        placeholder="Select Category"
        value={value}
        disable={true}
        onPress={() => setShow(prev => !prev)}
      />
      {show && (
        <Animated.ScrollView
          entering={FadeInUp}
          style={styles.dropdownStyle}
          contentContainerStyle={styles.contentContainerStyle}
          nestedScrollEnabled={true}
        >
          {items.map(item => {
            return (
              <Pressable
                onPress={() => {
                  setValue(item.value);
                  setShow(false);
                }}
                key={item.label}
                style={styles.cell}
              >
                <Text style={styles.cellTxt}>{item.label}</Text>
              </Pressable>
            );
          })}
        </Animated.ScrollView>
      )}
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  dropdownStyle: {
    position: 'absolute',
    width: '100%',
    top: '100%',
    backgroundColor: '#FFF',
    zIndex: 999,
    height: s(50) * 4,
    borderRadius: s(16),
  },
  contentContainerStyle: {},
  cell: {
    paddingHorizontal: s(16),
    height: s(50),
    justifyContent: 'center',
  },
  cellTxt: {
    fontFamily: Fonts.INTER.semiBold,
    fontSize: s(16),
    color: '#000000',
  },
});
