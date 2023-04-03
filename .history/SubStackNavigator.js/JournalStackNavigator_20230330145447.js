import { createNativeStackNavigator } from '@react-navigation/native-stack';

import JournalScreen from '../screens/JournalScreen';
import JournalDescription from '../components/Journal/JournalDescription';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const JournalStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={JournalScreen}/>
        <Stack.Screen name="Description" component={JournalDescription}/>        
    </Stack.Navigator>
  );
}

export default JournalStackNavigator;

