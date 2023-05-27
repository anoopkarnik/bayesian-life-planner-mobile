import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import CriteriaDescription from '../../../../components/RuleEngine/Criteria/CriteriaDescription';
import CriteriaScreen from '../CriteriaScreen';

const Stack = createNativeStackNavigator();

const CriteriaStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={CriteriaScreen}/>
        <Stack.Screen name="Description" component={CriteriaDescription}/>    
    </Stack.Navigator>
  );
}

export default CriteriaStackNavigator;

