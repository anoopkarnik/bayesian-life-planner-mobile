import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TransactionScreen from '../TransactionScreen';
import TransactionDescription from '../../../../components/Transaction/TransactionDescription';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const TransactionStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={TransactionScreen}/>
        <Stack.Screen name="Description" component={TransactionDescription}/>        
    </Stack.Navigator>
  );
}

export default TransactionStackNavigator;

