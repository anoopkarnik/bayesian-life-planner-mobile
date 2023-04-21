import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AccountScreen from '../AccountScreen';
import AccountDescription from '../../../../components/Account/AccountDescription';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const AccountStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={AccountScreen}/>
        <Stack.Screen name="Description" component={AccountDescription}/>        
    </Stack.Navigator>
  );
}

export default AccountStackNavigator;

