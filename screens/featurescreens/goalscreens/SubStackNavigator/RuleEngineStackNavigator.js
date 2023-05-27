import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import RuleEngineScreen from '../RuleEngineScreen';
import RuleEngineDescription from '../../../../components/RuleEngine/RuleEngine/RuleEngineDescription';

const Stack = createNativeStackNavigator();

const RuleEngineStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={RuleEngineScreen}/>
        <Stack.Screen name="Description" component={RuleEngineDescription}/>    
    </Stack.Navigator>
  );
}

export default RuleEngineStackNavigator;

