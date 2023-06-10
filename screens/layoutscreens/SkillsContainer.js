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


import SkillStackNavigator from '../featurescreens/skillscreens/SubStackNavigator/SkillStackNavigator';
import TopicStackNavigator from '../featurescreens/skillscreens/SubStackNavigator/TopicStackNavigator';
import { ActiveContext } from '../../context/ActiveContext';


const SkillsContainer = () => {
    const {showActive,setShowActive} = useContext(ActiveContext)
    const skillsName = 'Skills';
    const topicsName = 'Topics'
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
            initialRouteName={skillsName} 
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
                    if(rn===skillsName){
                        iconName=focused?'bookmarks':'bookmarks-outline'
                    }
                    else if(rn===topicsName){
                        iconName=focused?'book':'book-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={"white"}/>
                },
                
            })}>
                <Tab.Screen name={skillsName} component={SkillStackNavigator}/>
                <Tab.Screen name={topicsName} component={TopicStackNavigator}/>

            </Tab.Navigator>
        </NavigationContainer>
        </SafeAreaView>
    )
}

export default SkillsContainer