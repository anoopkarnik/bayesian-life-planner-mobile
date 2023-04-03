import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GoalScreen from '../screens/GoalScreen';
import GoalDescription from '../components/Goal/GoalDescription';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const GoalStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={GoalScreen}/>
        <Stack.Screen name="Description" component={GoalDescription}/>        
    </Stack.Navigator>
  );
}

export default GoalStackNavigator;

