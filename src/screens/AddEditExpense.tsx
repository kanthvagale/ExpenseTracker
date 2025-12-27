import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import FocusAwareStatusBar from '../components/FocusAwareStatusBar';
import Header from '../components/Header';
import { Icons } from '../assets/svg/Index';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from '../navigation/Index';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useEffect, useState } from 'react';
import { ms, s } from '../utils/scale';
import { Fonts } from '../constants/fonts';
import DropDown from '../components/DropDown';
import { CategoryListItems, ExpenseCategoryType } from '../constants/types';
import DateTimePicker from '../components/DateTimePicker';
import BaseTextInput from '../components/BaseTextInput';
import TextBox from '../components/TextBox';
import { KeyboardAwareScrollView } from 'react-native-keyboard-controller';
import { addExpense, editExpense } from '../store/slices/expenseSlice';
import { useAppDispatch } from '../store';
import moment from 'moment';
import { showToast } from '../utils/functions';

type AddEditExpenseNavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  'addEditExpense'
>;

const Categories: CategoryListItems[] = [
  { label: 'Food', value: 'Food' },
  { label: 'Bill', value: 'Bill' },
  { label: 'Shopping', value: 'Shopping' },
  { label: 'Travel', value: 'Travel' },
  { label: 'Others', value: 'Others' },
];

const AddEditExpense = () => {
  const { params } =
    useRoute<RouteProp<RootStackParamList, 'addEditExpense'>>();
  const navigation = useNavigation<AddEditExpenseNavigationProps>();
  const dispatch = useAppDispatch();

  const [amount, setAmount] = useState('');
  const [title, setTitle] = useState('');
  const [items, setItems] = useState(Categories);
  const [show, setShow] = useState(false);
  const [categoryValue, setCategoryValue] =
    useState<ExpenseCategoryType>('Others');
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState('');

  console.log('notessss', notes);

  useEffect(() => {
    if (params.type === 'Edit') {
      setTitle(params.expenseTitle);
      setAmount(params.amount.toString());
      setCategoryValue(params.category);
      setNotes(params?.notes || '');
      setDate(new Date(parseInt(params.date, 10) * 1000));
    }
  }, [params, params.type]);

  const handleAddEditExpense = () => {
    // console.log(moment(date).unix().toString());

    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      showToast({ title: 'Please Enter a Valid Amount', type: 'error' });
      return;
    }

    if (!title.trim()) {
      showToast({ title: 'Please Enter Title', type: 'error' });
      return;
    }

    if (!categoryValue) {
      showToast({ title: 'Please Select a Category', type: 'error' });
      return;
    }

    if (!date) {
      showToast({ title: 'Please Select Date & Time', type: 'error' });
      return;
    }

    if (params.type === 'Add') {
      dispatch(
        addExpense({
          id: (Math.random() * 1000000).toString(),
          amount: parseFloat(amount),
          category: categoryValue,
          date: moment(date).unix().toString(),
          expenseTitle: title,
          type: 'item',
          notes: notes,
        }),
      );
    } else {
      dispatch(
        editExpense({
          id: params.id,
          changes: {
            amount: parseFloat(amount),
            category: categoryValue,
            date: moment(date).unix().toString(),
            expenseTitle: title,
            type: 'item',
            notes: notes,
          },
        }),
      );
    }
    navigation.navigate('home');
  };

  return (
    <SafeAreaView style={styles.container}>
      <FocusAwareStatusBar
        barStyle={'dark-content'}
        backgroundColor={'#F6F7F8'}
      />
      {/* header */}
      <Header
        left={
          <Pressable onPress={() => navigation.goBack()} hitSlop={14}>
            <Icons.BackIcon width={20} height={20} />
          </Pressable>
        }
        title={params.type === 'Add' ? 'Add Expense' : 'Edit Expense'}
      />

      <KeyboardAwareScrollView
        bottomOffset={30}
        contentContainerStyle={{ flexGrow: 1, gap: s(20) }}
      >
        {/* amount */}
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>AMOUNT</Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: s(6) }}
          >
            <Text style={styles.amountTxt}>₹</Text>
            <TextInput
              value={amount}
              onChangeText={setAmount}
              style={styles.amountTxt}
              keyboardType="number-pad"
              placeholder="00.00"
              maxLength={8}
              placeholderTextColor={'#E2E8F0'}
            />
          </View>
        </View>

        {/* title */}
        <View style={styles.options}>
          <Text style={styles.optionsTxt}>Title</Text>
          <BaseTextInput
            placeholder="Add Title"
            value={title}
            setValue={setTitle}
          />
        </View>

        {/* category */}
        <View style={styles.options}>
          <Text style={styles.optionsTxt}>Category</Text>
          <DropDown
            items={items}
            setItems={setItems}
            setShow={setShow}
            setValue={setCategoryValue}
            show={show}
            value={categoryValue}
          />
        </View>

        {/* date time */}
        <View style={styles.options}>
          <Text style={styles.optionsTxt}>Date & Time</Text>
          <DateTimePicker value={date} setValue={setDate} />
        </View>

        {/* notes */}
        <View style={styles.options}>
          <Text style={styles.optionsTxt}>Notes (Optional)</Text>
          <TextBox placeholder="Add Notes" value={notes} setValue={setNotes} />
        </View>
      </KeyboardAwareScrollView>

      <Pressable style={[styles.addExpense]} onPress={handleAddEditExpense}>
        <Text style={styles.addExpenseTxt}>Save Expense</Text>
      </Pressable>
    </SafeAreaView>
  );
};

export default AddEditExpense;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F6F7F8',
    gap: s(20),
  },
  amountContainer: {
    paddingVertical: s(50),
    gap: s(16),
    justifyContent: 'center',
    alignItems: 'center',
  },
  amount: {
    color: '#65768C',
    fontFamily: Fonts.INTER.semiBold,
    fontSize: ms(18),
  },
  amountTxt: {
    color: '#1B7FE6',
    fontFamily: Fonts.INTER.semiBold,
    fontSize: ms(50),
  },
  options: {
    paddingHorizontal: s(16),
    gap: s(12),
  },
  optionsTxt: {
    color: '#65768C',
    fontFamily: Fonts.INTER.semiBold,
    fontSize: ms(16),
  },

  addExpense: {
    marginHorizontal: s(16),
    marginBottom: s(24),
    paddingHorizontal: s(24),
    paddingVertical: s(18),
    backgroundColor: '#1B7FE6',
    borderRadius: s(100),
    alignItems: 'center',

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
});
