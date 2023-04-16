import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import LifePlannerContainer from './LifePlannerContainer'
import ProfileScreen from '../featurescreens/profilescreens/ProfileScreen'
import 'react-native-gesture-handler';
import { createDrawerNavigator,  DrawerContentScrollView,
  DrawerItemList,  DrawerItem, } from '@react-navigation/drawer';
import { useNavigation } from '@react-navigation/native';
import { useLayoutEffect } from 'react';
import { useEffect,useContext } from 'react'
import GoalStackNavigator from '../featurescreens/goalscreens/SubStackNavigator/GoalStackNavigator'
import SkillStackNavigator from '../featurescreens/skillscreens/SubStackNavigator/SkillStackNavigator'
import CustomDrawer from './CustomDrawer'
import { UserContext } from '../../context/UserContext'
import GoalsContainer from './GoalsContainer'
import SkillsContainer from './SkillsContainer'
import ConfigureScreen from '../featurescreens/lifeplannerscreens/ConfigureScreen'

const ContainerNavigator = () => {

  const navigation = useNavigation();
  const {user} = useContext(UserContext);
  useLayoutEffect(() => {
      navigation.setOptions({
          headerShown:false,
      });
  }, [])

  useEffect(()=>{
if(typeof user.name === 'undefined' || !user.name){   
      navigation.navigate("Login")
    }
  },[user])
    const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator 
        drawerContent={props=><CustomDrawer {...props}/>} 
        initialRouteName="LifePlanner" 
        screenOptions={{
          drawerActiveTintColor:'#fff',
          drawerInactiveTintColor:'#fff',
          drawerLabelStyle:{
            fontSize:20
          }
          
        }}>
        <Drawer.Screen name="LifePlanner" component={LifePlannerContainer} />
        <Drawer.Screen name="Goals" component={GoalsContainer} />
        <Drawer.Screen name="Skills" component={SkillsContainer} />
        <Drawer.Screen name="Configure" component={ConfigureScreen} />
        <Drawer.Screen name="Profile" component={ProfileScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default ContainerNavigator;