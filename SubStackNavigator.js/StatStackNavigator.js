import { createNativeStackNavigator } from '@react-navigation/native-stack';

import StatScreen from '../screens/StatScreen';
import StatDescription from '../components/Stat/StatDescription';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const StatStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={StatScreen}/>
        <Stack.Screen name="Description" component={StatDescription}/>        
    </Stack.Navigator>
  );
}

export default StatStackNavigator;

