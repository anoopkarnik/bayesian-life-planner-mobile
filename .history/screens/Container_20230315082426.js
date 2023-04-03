import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HabitScreen from './HabitScreen';
import AdminScreen from './AdminScreen';
import BadHabitScreen from './BadHabitScreen';
import GoalScreen from './GoalScreen';
import JournalScreen from './JournalScreen';
import SkillScreen from './SkillScreen';
import StatsScreen from './StatsScreen';
import TaskScreen from './TaskScreen';
import ProfileScreen from './ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Container = () => {
    const habitName = 'Habit';
    const profileName = 'Profile';
    const Tab = createBottomTabNavigator();
  
    return (
        <NavigationContainer independent={true}>
            <Tab.Navigator
            initialRouteName={habitName} 
            screenOptions={({route}) => ({
                tabBarIcon: ({focused,color,size})=>{
                    let iconName;
                    let rn = route.name;
                    if(rn===habitName){
                        iconName=focused?'home':'home-outline'
                    } else if (rn==profileName){
                        iconName= focused?'person-circle':'person-circle-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                
            })}>
                <Tab.Screen name={habitName} component={HabitScreen}/>
                <Tab.Screen name={profileName} component={ProfileScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Container