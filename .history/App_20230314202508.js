import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';
import HomeScreen from './screens/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from './screens/ProfileScreen';
import LoginScreen from './screens/LoginScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  const user = false;
  return (
    <NavigationContainer>
      <Provider store={store}>
        <TailwindProvider>
          <Stack.Navigator>
            {user? (<>
            <Stack.Screen name="Home" component={HomeScreen}/>
            <Stack.Screen name="Profile" component={ProfileScreen}/>
            </>):(
            <Stack.Screen name="Login" component={LoginScreen}/>)}
          </Stack.Navigator>
        </TailwindProvider>
      </Provider>
    </NavigationContainer>
  );
}


