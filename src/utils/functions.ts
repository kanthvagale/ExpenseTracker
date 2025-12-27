import Snackbar from 'react-native-snackbar';

export const toLocalCurrency = (value: string) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(Number(value));

export const showToast = ({
  title = '',
  type = 'success',
  visibilityTime = 4000,
}) => {
  Snackbar.show({
    text: title,
    backgroundColor: type === 'success' ? '#44B461' : 'red',
    textColor: '#FFFFFF',
    duration: visibilityTime,
  });
};
