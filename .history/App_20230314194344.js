import { StyleSheet, Text, View } from 'react-native';
import { TailwindProvider } from 'tailwindcss-react-native';
import { NavigationContainer} from '@react-navigation/native';
import { Provider } from 'react-redux';
import { store } from './store';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <View>
      <Text className="text-red-500">Open up App.js to start working on your app!</Text>
    </View>
  );
}


