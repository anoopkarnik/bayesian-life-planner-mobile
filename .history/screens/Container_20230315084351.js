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
    const adminName = 'Admin';
    const badHabitName = 'BadHabit';
    const goalName = 'Goal';
    const journalName = 'Journal';
    const skillName = 'Skill';
    const statsName = 'Stats';
    const taskName = 'Task';
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
                    } else if (rn==taskName){
                        iconName= focused?'person-circle':'person-circle-outline'
                    } else if (rn==journalName){
                        iconName= focused?'person-circle':'person-circle-outline'
                    } else if (rn==skillName){
                        iconName= focused?'person-circle':'person-circle-outline'
                    }else if (rn==statsName){
                        iconName= focused?'person-circle':'person-circle-outline'
                    }else if (rn==goalName){
                        iconName= focused?'person-circle':'person-circle-outline'
                    }else if (rn==badHabitName){
                        iconName= focused?'person-circle':'person-circle-outline'
                    }else if (rn==adminName){
                        iconName= focused?'person-circle':'person-circle-outline'
                    }else if (rn==profileName){
                        iconName= focused?'person-circle':'person-circle-outline'
                    }

                    return <Ionicons name={iconName} size={size} color={color}/>
                },
                
            })}>
                <Tab.Screen name={habitName} component={HabitScreen}/>
                <Tab.Screen name={taskName} component={TaskScreen}/>
                <Tab.Screen name={journalName} component={JournalScreen}/>
                <Tab.Screen name={statsName} component={StatsScreen}/>
                <Tab.Screen name={skillName} component={SkillScreen}/>
                <Tab.Screen name={goalName} component={GoalScreen}/>
                <Tab.Screen name={badHabitName} component={BadHabitScreen}/>
                <Tab.Screen name={adminName} component={AdminScreen}/>
                <Tab.Screen name={profileName} component={ProfileScreen}/>
            </Tab.Navigator>
        </NavigationContainer>
    )
}

export default Container