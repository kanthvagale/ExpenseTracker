import {
  FlatList,
  ListRenderItem,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, { useCallback, useMemo } from 'react';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import { ms, s } from '../utils/scale';
import { Fonts } from '../constants/fonts';
import TotalExpenses from '../components/TotalExpenses';
import ExpenseItem from '../components/Home/ExpenseItem';
import { ExpenseitemProps } from '../constants/types';
import { Icons } from '../assets/svg/Index';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/Index';
import { useAppSelector } from '../store';
import moment from 'moment';

const dummyData: ExpenseitemProps[] = [
  {
    expenseTitle: 'hello',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'header',
  },
  {
    expenseTitle: 'bill1',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill22',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill1',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill22',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill1',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill22',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill1',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill22',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill1',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill22',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill1',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill22',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill1',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
  {
    expenseTitle: 'bill22',
    amount: 123,
    category: 'Bill',
    date: new Date().toDateString(),
    type: 'item',
  },
];

type HomeNavigationProp = NativeStackNavigationProp<RootStackParamList, 'home'>;

const Home = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation<HomeNavigationProp>();
  const { data } = useAppSelector(store => store.expense);

  const getSectionList = useMemo(() => {
    const groupedData: ExpenseitemProps[] = [];

    let lastDate = '';

    const sortedData = [...data].sort(
      (a, b) => Number(b.date) - Number(a.date), // latest first
    );

    sortedData.forEach(item => {
      const formattedDate = moment
        .unix(Number(item.date))
        .format('DD MMM YYYY');

      if (formattedDate !== lastDate) {
        groupedData.push({
          ...item,
          type: 'header',
        });
        lastDate = formattedDate;
      }

      groupedData.push({
        ...item,
        type: 'item',
      });
    });

    return groupedData;
  }, [data]);

  const stickyHeaderIndices = useMemo(
    () =>
      getSectionList
        .map((item, index) => (item.type === 'header' ? index + 1 : null))
        .filter((index): index is number => index !== null),
    [getSectionList],
  );

  const renderExpenseItem = useCallback<ListRenderItem<ExpenseitemProps>>(
    ({ item }) => {
      return <ExpenseItem {...item} />;
    },
    [],
  );

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor={'#FFFFFF'}
      />
      {/* header */}
      <View style={styles.header}>
        <Text style={styles.headerTxt}>Expense Tracker</Text>
      </View>

      <FlatList
        ListHeaderComponent={<TotalExpenses />}
        data={getSectionList}
        renderItem={renderExpenseItem}
        keyExtractor={item => item.id}
        stickyHeaderIndices={stickyHeaderIndices}
        ListEmptyComponent={<Text style={styles.noExpense}>No Expenses</Text>}
        contentContainerStyle={styles.contentContainerStyle}
      />

      {/* add expense */}
      <Pressable
        style={[styles.addExpense, { bottom: insets.bottom + s(24) }]}
        onPress={() => {
          navigation.navigate('addEditExpense', { type: 'Add' });
        }}
      >
        <Icons.PlusIcon width={24} height={24} />
        <Text style={styles.addExpenseTxt}>Add Expense</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
  },
  header: {
    padding: s(16),
  },
  headerTxt: {
    fontFamily: Fonts.INTER.bold,
    fontSize: s(28),
    color: '#000000',
  },
  contentContainerStyle: {
    paddingHorizontal: s(16),
    gap: s(12),
    paddingBottom: s(100),
  },
  addExpense: {
    paddingHorizontal: s(24),
    paddingVertical: s(18),
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#1B7FE6',
    zIndex: 99,
    flexDirection: 'row',
    gap: s(12),
    borderRadius: s(100),
    alignSelf: 'center',

    shadowColor: '#1B7FE6',
    shadowOffset: {
      width: 0,
      height: 6,
    },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,

    elevation: 12,
  },
  addExpenseTxt: {
    fontFamily: Fonts.INTER.bold,
    fontSize: s(18),
    color: '#FFFFFF',
  },
  noExpense: {
    textAlign: 'center',
    fontFamily: Fonts.INTER.semiBold,
    fontSize: ms(18),
  },
});
