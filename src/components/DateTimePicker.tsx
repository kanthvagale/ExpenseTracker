import { View } from 'react-native';
import React, { useState } from 'react';
import BaseTextInput from './BaseTextInput';
import { Icons } from '../assets/svg/Index';
import DatePicker from 'react-native-date-picker';
import moment from 'moment';

type DateTimePickerProps = {
  value: Date;
  setValue: React.Dispatch<React.SetStateAction<Date>>;
};

const DateTimePicker = ({ value, setValue }: DateTimePickerProps) => {
  const [show, setShow] = useState(false);

  return (
    <View>
      <BaseTextInput
        left={<Icons.CalendarIcon width={20} height={20} stroke={'#0081EE'} />}
        placeholder="Select Date & Time"
        value={moment(value).format('MMM Do YYYY, h:mm A')}
        disable={true}
        onPress={() => setShow(prev => !prev)}
      />

      <DatePicker
        modal
        open={show}
        date={value}
        onConfirm={date => {
          setShow(false);
          setValue(date);
        }}
        onCancel={() => {
          setShow(false);
        }}
        maximumDate={new Date()}
      />
    </View>
  );
};

export default DateTimePicker;
