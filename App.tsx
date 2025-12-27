import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppContent from './src/navigation/Index';
import { KeyboardProvider } from 'react-native-keyboard-controller';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistor, store } from './src/store';
import { LogBox } from 'react-native';
LogBox.ignoreAllLogs();

function App() {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider
        navigationBarTranslucent={true}
        statusBarTranslucent={true}
      >
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <AppContent />
          </PersistGate>
        </Provider>
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

export default App;
