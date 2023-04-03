import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SkillScreen from '../screens/SkillScreen';
import SkillDescription from '../components/Skill/SkillDescription';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const SkillStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={SkillScreen}/>
        <Stack.Screen name="Description" component={SkillDescription}/>        
    </Stack.Navigator>
  );
}

export default SkillStackNavigator;

