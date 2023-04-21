import { View, Text,SafeAreaView,TouchableOpacity } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { useEffect,useContext } from 'react'
import { UserContext } from '../../context/UserContext'
import {Bars3BottomRightIcon,Bars3Icon} from 'react-native-heroicons/solid';
import { Menu,MenuTrigger,MenuOptions,MenuOption } from 'react-native-popup-menu';

import HabitStackNavigator from '../featurescreens/lifeplannerscreens/SubStackNavigator/HabitStackNavigator'
import ConfigureScreen from '../featurescreens/ConfigureScreen';
import ProfileScreen from '../featurescreens/profilescreens/ProfileScreen';
import TaskStackNavigator from '../featurescreens/lifeplannerscreens/SubStackNavigator/TaskStackNavigator'
import JournalStackNavigator from '../featurescreens/lifeplannerscreens/SubStackNavigator/JournalStackNavigator'
import StatStackNavigator from '../featurescreens/lifeplannerscreens/SubStackNavigator/StatStackNavigator'
import SkillStackNavigator from '../featurescreens/skillscreens/SubStackNavigator/SkillStackNavigator'
import BadHabitStackNavigator from '../featurescreens/lifeplannerscreens/SubStackNavigator/BadHabitStackNavigator'
import GoalStackNavigator from '../featurescreens/goalscreens/SubStackNavigator/GoalStackNavigator'
import { ActiveContext } from '../../context/ActiveContext';


const LifePlannerContainer = () => {
    const {showActive,setShowActive} = useContext(ActiveContext)
    const habitName = 'Habit';
    const configureName = 'Configure';
    const badHabitName = 'BadHabit';
    const journalName = 'Journal';
    const statsName = 'Stats';
    const taskName = 'Task';
    const Tab = createBottomTabNavigator();
    const {user} = useContext(UserContext);

    const navigation = useNavigation();
    useLayoutEffect(() => {
        navigation.setOptions({
            headerShown:false,
        });
    }, [])
  
    return (
        <SafeAreaView className="bg-[#314155] flex-1">
            <View className="flex-row mt-8 mb-3">
                <TouchableOpacity className="flex-1 " onPress={()=>navigation.toggleDrawer()}>
                    <Bars3Icon color="white" size={30}/>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Menu>
                        <MenuTrigger>
                            <Bars3BottomRightIcon color="white" size={30}/>
                        </MenuTrigger>
                        <MenuOptions>
                        <MenuOption onSelect={()=>setShowActive(true)} text="active"/>
                        <MenuOption onSelect={()=>setShowActive(false)} text="inactive"/>
                        </MenuOptions>
                    </Menu>
                </TouchableOpacity>
            </View>
        <NavigationContainer  independent={true}>
            <Tab.Navigator 
            initialRouteName={habitName} 
            screenOptions={({route}) => ({
                showLabel:true,
                scrollEnabled:true,
                tabBarScrollEnabled: true,
                tabBarIndicator: () => null,
                tabBarLabel: ({focused, color, size}) => (
                    <Text className="text-xs" style={{color: focused ? 'orange' : "white"}}>{route.name}</Text>
                  ),
                tabBarStyle: {
                  backgroundColor: '#556581',
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
                    }else if (rn==statsName){
                        iconName= focused?'stats-chart':'stats-chart-outline'
                    }else if (rn==badHabitName){
                        iconName= focused?'remove-circle':'remove-circle-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={"white"}/>
                },
                
            })}>
                <Tab.Screen name={habitName} component={HabitStackNavigator}/>
                <Tab.Screen name={taskName} component={TaskStackNavigator}/>
                <Tab.Screen name={journalName} component={JournalStackNavigator}/>
                <Tab.Screen name={statsName} component={StatStackNavigator}/>
                <Tab.Screen name={badHabitName} component={BadHabitStackNavigator}/>
            </Tab.Navigator>
        </NavigationContainer>
        </SafeAreaView>
    )
}

export default LifePlannerContainer