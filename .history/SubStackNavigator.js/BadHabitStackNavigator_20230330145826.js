import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BadHabitScreen from '../screens/BadHabitScreen';
import BadHabitDescription from '../components/BadHabit/BadHabitDescription';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const BadHabitStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={BadHabitScreen}/>
        <Stack.Screen name="Description" component={BadHabitDescription}/>        
    </Stack.Navigator>
  );
}

export default BadHabitStackNavigator;

