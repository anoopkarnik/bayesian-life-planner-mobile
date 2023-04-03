import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'

import HabitStackNavigator from '../SubStackNavigator.js/HabitStackNavigator'
import ConfigureScreen from './ConfigureScreen';
import BadHabitScreen from './BadHabitScreen';
import GoalScreen from './GoalScreen';
import SkillScreen from './SkillScreen';
import ProfileScreen from './ProfileScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import TaskStackNavigator from '../SubStackNavigator.js/TaskStackNavigator'
import JournalStackNavigator from '../SubStackNavigator.js/JournalStackNavigator'
import StatStackNavigator from '../SubStackNavigator.js/StatStackNavigator'
import SkillStackNavigator from '../SubStackNavigator.js/SkillStackNavigator'
import BadHabitStackNavigator from '../SubStackNavigator.js/BadHabitStackNavigator'
import GoalStackNavigator from '../SubStackNavigator.js/GoalStackNavigator'
const Container = () => {
    const habitName = 'Habit';
    const configureName = 'Configure';
    const badHabitName = 'BadHabit';
    const goalName = 'Goal';
    const journalName = 'Journal';
    const skillName = 'Skill';
    const statsName = 'Stats';
    const taskName = 'Task';
    const profileName = 'Profile';
    const Tab = createBottomTabNavigator();

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  
    return (
        <NavigationContainer  independent={true}>
            <Tab.Navigator 
            initialRouteName={habitName} 
            screenOptions={({route}) => ({
                showLabel:true,
                scrollEnabled:true,
                tabBarScrollEnabled: true,
                tabBarIndicator: () => null,
                tabBarStyle: {
                  backgroundColor: '#000',
                },
                tabBarIcon: ({focused,color,size})=>{
                    let iconName;
                    let rn = route.name;
                    if(rn===habitName){
                        iconName=focused?'alarm':'alarm-outline'
                    } else if (rn==taskName){
                        iconName= focused?'checkmark-done':'checkmark-done-outline'
                    } else if (rn==journalName){
                        iconName= focused?'journal':'journal-outline'
                    } else if (rn==skillName){
                        iconName= focused?'book':'book-outline'
                    }else if (rn==statsName){
                        iconName= focused?'stats-chart':'stats-chart-outline'
                    }else if (rn==goalName){
                        iconName= focused?'flag':'flag-outline'
                    }else if (rn==badHabitName){
                        iconName= focused?'remove-circle':'remove-circle-outline'
                    }else if (rn==configureName){
                        iconName= focused?'construct':'construct-outline'
                    }else if (rn==profileName){
                        iconName= focused?'person-circle':'person-circle-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                
            })}>
                <Tab.Screen name={habitName} component={HabitStackNavigator}/>
                <Tab.Screen name={taskName} component={TaskStackNavigator}/>
                <Tab.Screen name={journalName} component={JournalStackNavigator}/>
                <Tab.Screen name={statsName} component={StatStackNavigator}/>
                <Tab.Screen name={skillName} component={SkillStackNavigator}/>
                <Tab.Screen name={goalName} component={GoalStackNavigator}/>
                <Tab.Screen name={badHabitName} component={BadHabitStackNavigator}/>
                <Tab.Screen name={configureName} component={ConfigureScreen}/>
                <Tab.Screen name={profileName} component={ProfileScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Container