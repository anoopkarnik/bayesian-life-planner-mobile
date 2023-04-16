import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TaskScreen from '../TaskScreen';
import TaskDescription from '../../../../components/Task/TaskDescription';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const TaskStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={TaskScreen}/>
        <Stack.Screen name="Description" component={TaskDescription}/>        
    </Stack.Navigator>
  );
}

export default TaskStackNavigator;

