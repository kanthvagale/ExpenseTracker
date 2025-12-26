import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AppContent from './src/navigation/Index';
import { KeyboardProvider } from 'react-native-keyboard-controller';

function App() {
  return (
    <GestureHandlerRootView>
      <KeyboardProvider
        navigationBarTranslucent={true}
        statusBarTranslucent={true}
      >
        <AppContent />
      </KeyboardProvider>
    </GestureHandlerRootView>
  );
}

export default App;
