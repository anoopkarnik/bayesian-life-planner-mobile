import { createNativeStackNavigator } from '@react-navigation/native-stack';

import TopicScreen from '../TopicScreen';
import TopicDescription from '../../../../components/Topic/TopicDescription';
import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const Stack = createNativeStackNavigator();

const TopicStackNavigator= ()=> {
    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  return (
    <Stack.Navigator>
        <Stack.Screen name="Normal" component={TopicScreen}/>
        <Stack.Screen name="Description" component={TopicDescription}/>
    </Stack.Navigator>
  );
}

export default TopicStackNavigator;

