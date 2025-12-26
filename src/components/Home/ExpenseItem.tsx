import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ExpenseitemProps } from '../../constants/types';
import { ms, s } from '../../utils/scale';
import { Fonts } from '../../constants/fonts';
import { Icons } from '../../assets/svg/Index';
import { toLocalCurrency } from '../../utils/functions';
import moment from 'moment';
import Animated, {
  // FadeInDown,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const SNAP_TRANSLATE_X = s(130 + 12);
const THRESHOLD_X = SNAP_TRANSLATE_X / 2;

const selectLogo = (category: string) => {
  switch (category) {
    case 'Bill':
      return <Icons.BillIcon width={28} height={28} />;
    case 'Food':
      return <Icons.FoodIcon width={28} height={28} />;
    case 'Others':
      return <Icons.OthersIcon width={28} height={28} />;
    case 'Shopping':
      return <Icons.ShoppingIcon width={28} height={28} />;
    case 'Travel':
      return <Icons.TransportIcon width={28} height={28} />;
  }
};

const ExpenseItem = ({
  type,
  date,
  amount,
  category,
  expenseTitle,
}: // index,
ExpenseitemProps & { index: number }) => {
  const translateValue = useSharedValue(0);
  const onLeft = useSharedValue(false);

  const panGesture = Gesture.Pan()
    .activeOffsetX([-10, 10])
    .onUpdate(e => {
      if (onLeft.value) {
        translateValue.value = -SNAP_TRANSLATE_X + e.translationX;
      } else {
        translateValue.value = e.translationX;
      }
    })
    .onEnd(e => {
      if (e.translationX < -THRESHOLD_X) {
        translateValue.value = withTiming(-SNAP_TRANSLATE_X);
        onLeft.value = true;
      } else {
        translateValue.value = withTiming(0);
        onLeft.value = false;
      }
    });

  const panAnimation = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateValue.value }],
    };
  });

  if (type === 'header') {
    return <StickyHeader date={date} />;
  }

  return (
    <View style={styles.mainContainer}>
      <GestureDetector gesture={panGesture}>
        <Animated.View
          // entering={FadeInDown.delay(index * 100)}
          style={[styles.container, panAnimation]}
        >
          {/* logo */}
          <View style={styles.logo}>{selectLogo(category)}</View>

          {/* details */}
          <View style={styles.details}>
            <Text style={styles.title}>{expenseTitle}</Text>
            <View style={styles.subDetails}>
              <Text style={styles.date}>{category}</Text>
              <View style={styles.dot} />
              <Text style={styles.date}>{moment(date).format('h:mm A')}</Text>
            </View>
          </View>

          {/* amount */}
          <Text style={styles.amount}>-{toLocalCurrency(amount + '')}</Text>
        </Animated.View>
      </GestureDetector>

      <View style={styles.options}>
        <View style={styles.edit}>
          <Icons.EditIcon width={24} height={24} />
        </View>

        <View style={styles.delete}>
          <Icons.DeleteIcon width={24} height={24} />
        </View>
      </View>
    </View>
  );
};

const StickyHeader = ({ date }: { date: string }) => {
  return (
    <View style={styles.stickyHeader}>
      <Text style={styles.stickyHeaderTxt}>{date}</Text>
    </View>
  );
};

export default ExpenseItem;

const styles = StyleSheet.create({
  mainContainer: {
  },
  container: {
    padding: s(16),
    backgroundColor: '#FFF',
    borderRadius: s(16),
    gap: s(12),
    flexDirection: 'row',
    alignItems: 'center',

    // shadowColor: '#1B7FE6',
    // shadowOffset: {
    //   width: 0,
    //   height: 3,
    // },
    // shadowOpacity: 0.27,
    // shadowRadius: 4.65,

    // elevation: 6,
  },
  details: {
    flex: 1,
  },
  title: {
    fontFamily: Fonts.INTER.bold,
    fontSize: ms(20),
    color: '#000000',
    textTransform: 'capitalize',
  },
  subDetails: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: s(4),
  },
  dot: {
    width: s(4),
    height: s(4),
    borderRadius: s(4),
    backgroundColor: '#64758B',
  },
  date: {
    fontFamily: Fonts.INTER.medium,
    fontSize: ms(16),
    color: '#64758B',
  },
  amount: {
    fontFamily: Fonts.INTER.bold,
    fontSize: ms(20),
    color: '#000000',
  },
  stickyHeader: {
    backgroundColor: '#F6F7F8',
    paddingVertical: s(16),
    // paddingTop: s(24),
    zIndex: 999,
  },
  stickyHeaderTxt: {
    fontFamily: Fonts.INTER.bold,
    fontSize: ms(18),
    color: '#64758B',
  },
  logo: {
    width: s(48),
    height: s(48),
    borderRadius: s(50),
    backgroundColor: '#1B7FE6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  options: {
    position: 'absolute',
    width: s(130),
    height: '100%',
    flexDirection: 'row',
    gap: s(12),
    right: 0,
    zIndex: -1,
  },
  edit: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E7EB',
    borderRadius: s(16),
  },
  delete: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#EF4444',
    borderRadius: s(16),
  },
});
