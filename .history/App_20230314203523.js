
import { NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import { AuthProvider } from './hooks/useAuth';
import StackNavigator from './StackNavigator';


export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
          <StackNavigator/>
      </AuthProvider>
    </NavigationContainer>
  );
}


