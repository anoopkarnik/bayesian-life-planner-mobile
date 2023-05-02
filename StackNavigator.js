import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer} from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/layoutscreens/LoginScreen';
import SignupScreen from './screens/layoutscreens/SignupScreen';
import ForgotPasswordScreen from './screens/layoutscreens/ForgotPasswordScreen';
import ContainerNavigator from './screens/layoutscreens/ContainerNavigator';
const Stack = createNativeStackNavigator();

const StackNavigator= ()=> {

  return (
          <TailwindProvider>
            <Stack.Navigator>
              <Stack.Screen name="Login" component={LoginScreen}/>           
              <Stack.Screen name="Signup" component={SignupScreen}/>
              <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen}/>
              <Stack.Screen name="Container" component={ContainerNavigator}/>
            </Stack.Navigator>
          </TailwindProvider>
  );
}

export default StackNavigator;

