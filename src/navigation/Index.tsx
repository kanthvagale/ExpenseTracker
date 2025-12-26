import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import Home from '../screens/Home';
import AddEditExpense from '../screens/AddEditExpense';

export type RootStackParamList = {
  splashscreen: undefined;
  home: undefined;
  addEditExpense: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function AppContent() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name={'splashscreen'} component={SplashScreen} />
        <Stack.Screen name={'home'} component={Home} />
        <Stack.Screen name={'addEditExpense'} component={AddEditExpense} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppContent;
