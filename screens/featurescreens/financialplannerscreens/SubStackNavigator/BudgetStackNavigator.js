import { createNativeStackNavigator } from '@react-navigation/native-stack';

import BudgetScreen from '../BudgetScreen';
import BudgetDescription from '../../../../components/Budget/BudgetDescription';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const BudgetStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={BudgetScreen}/>
        <Stack.Screen name="Description" component={BudgetDescription}/>        
    </Stack.Navigator>
  );
}

export default BudgetStackNavigator;

