import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FundScreen from '../FundScreen';
import FundDescription from '../../../../components/Fund/FundDescription';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const FundStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={FundScreen}/>
        <Stack.Screen name="Description" component={FundDescription}/>        
    </Stack.Navigator>
  );
}

export default FundStackNavigator;

