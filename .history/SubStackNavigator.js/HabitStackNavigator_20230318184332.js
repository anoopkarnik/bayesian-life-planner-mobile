import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HabitScreen from '../screens/HabitScreen';
import HabitDescription from '../components/Habit/HabitDescription';

const Stack = createNativeStackNavigator();

const HabitStackNavigator= ()=> {
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={HabitScreen}/>
        <Stack.Screen name="Description" component={HabitDescription}/>        
    </Stack.Navigator>
  );
}

export default HabitStackNavigator;

