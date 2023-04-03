import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import ForgotPasswordScreen from './screens/ForgotPasswordScreen';

const Stack = createNativeStackNavigator();

const StackNavigator= ()=> {
  const user = false;
  return (
        <Provider store={store}>
          <TailwindProvider>
            <Stack.Navigator>
                <Stack.Screen name="Login" component={LoginScreen}/>
              <Stack.Screen name="Home" component={HomeScreen}/>
              <Stack.Screen name="Profile" component={ProfileScreen}/>
              
              <Stack.Screen name="Signup" component={SignupScreen}/>
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
            </Stack.Navigator>
          </TailwindProvider>
        </Provider>
  );
}

export default StackNavigator;

