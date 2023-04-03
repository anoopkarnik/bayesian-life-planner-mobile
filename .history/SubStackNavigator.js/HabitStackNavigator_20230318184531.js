import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HabitScreen from '../screens/HabitScreen';
import HabitDescription from '../components/Habit/HabitDescription';
import { useLayoutEffect } from 'react';

const Stack = createNativeStackNavigator();

const HabitStackNavigator= ()=> {
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={HabitScreen}/>
        <Stack.Screen name="Description" component={HabitDescription}/>        
    </Stack.Navigator>
  );
}

export default HabitStackNavigator;

