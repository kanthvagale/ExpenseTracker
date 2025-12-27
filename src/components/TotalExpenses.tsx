import { StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import { Fonts } from '../constants/fonts';
import { ms, s } from '../utils/scale';
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { useAppSelector } from '../store';

const TotalExpenses = () => {
  const { data } = useAppSelector(store => store.expense);
  const total = useMemo(() => {
    return data.reduce((sum, item) => sum + item.amount, 0);
  }, [data]);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Total Expenses</Text>
      <AnimatedNumber number={total} key={'animatedNumber'} />
    </View>
  );
};

Animated.addWhitelistedNativeProps({ text: true });

const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);

type AnimatedNumberProps = {
  number: number;
  duration?: number;
};

export function AnimatedNumber({
  number,
  duration = 1000,
}: AnimatedNumberProps) {
  const sharedNumber = useSharedValue(0);

  useEffect(() => {
    sharedNumber.value = withTiming(number, { duration: duration });
  }, [duration, number, sharedNumber]);

  const animatedProps = useAnimatedProps(() => {
    const formator = (num: number) =>
      new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'INR',
        maximumFractionDigits: 2,
      }).format(num);

    return {
      text: formator(sharedNumber.value),
      defaultValue: formator(sharedNumber.value),
    };
  });

  return (
    <View pointerEvents="none">
      <AnimatedTextInput
        editable={false}
        style={styles.value}
        animatedProps={animatedProps}
      />
    </View>
  );
}

export default TotalExpenses;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: s(24),
  },
  header: {
    fontFamily: Fonts.INTER.semiBold,
    fontSize: ms(18),
    color: '#64758B',
  },
  value: {
    fontFamily: Fonts.INTER.bold,
    fontSize: ms(36),
    color: '#0E172A',
    // backgroundColor: 'pink',
    lineHeight: ms(36),
  },
});
