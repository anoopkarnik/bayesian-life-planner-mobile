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


import GoalStackNavigator from '../featurescreens/goalscreens/SubStackNavigator/GoalStackNavigator'
import { ActiveContext } from '../../context/ActiveContext';
import CriteriaStackNavigator from '../featurescreens/goalscreens/SubStackNavigator/CriteriaStackNavigator';
import RuleEngineStackNavigator from '../featurescreens/goalscreens/SubStackNavigator/RuleEngineStackNavigator';


const GoalsContainer = () => {
    const {showActive,setShowActive} = useContext(ActiveContext)
    const criteriaName = 'Criteria';
    const ruleEngineName = 'Rule Engine';
    const goalsName = 'Goals';
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
            initialRouteName={goalsName} 
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
                    if(rn===goalsName){
                        iconName=focused?'trophy':'trophy-outline'
                    } 
                    else if(rn===criteriaName){
                        iconName=focused?'hammer':'hammer-outline'
                    }
                    else if(rn===ruleEngineName){
                        iconName=focused?'cog':'cog-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={"white"}/>

                },
                
            })}>
                <Tab.Screen name={goalsName} component={GoalStackNavigator}/>
                <Tab.Screen name={criteriaName} component={CriteriaStackNavigator}/>
                <Tab.Screen name={ruleEngineName} component={RuleEngineStackNavigator}/>

            </Tab.Navigator>
        </NavigationContainer>
        </SafeAreaView>
    )
}

export default GoalsContainer