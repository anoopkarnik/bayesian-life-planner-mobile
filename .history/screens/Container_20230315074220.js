import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TvIcon } from 'react-native-heroicons/solid';
import PlusCircleIcon from 'react-native-heroicons/solid';

import HomeScreen from './HomeScreen';
import ProfileScreen from './ProfileScreen';

const Container = () => {
    const homeName = 'Home';
    const profileName = 'Profile';
    const Tab = createBottomTabNavigator();
  
    return (
        <NavigationContainer>
            <Tab.Navigator
            initialRouteName={homeName} 
            screenOptions={({route}) => ({
                tabBarIcon: ({focused,color,size})=>{
                    let iconName;
                    let rn = route.name;
                    if(rn===homeName){
                        iconName=focused?'home':'home-outline'
                    }
                },
                
            })}>

            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Container