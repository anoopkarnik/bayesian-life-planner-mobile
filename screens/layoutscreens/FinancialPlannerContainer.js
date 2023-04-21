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
import TransactionStackNavigator from '../featurescreens/financialplannerscreens/SubStackNavigator/TransactionStackNavigator';
import { ActiveContext } from '../../context/ActiveContext';
import AccountStackNavigator from '../featurescreens/financialplannerscreens/SubStackNavigator/AccountStackNavigator copy';
import BudgetStackNavigator from '../featurescreens/financialplannerscreens/SubStackNavigator/BudgetStackNavigator';
import FundStackNavigator from '../featurescreens/financialplannerscreens/SubStackNavigator/FundStackNavigator';

const FinancialPlannerContainer = () => {
    const {showActive,setShowActive} = useContext(ActiveContext)
    const transactionName = 'Transactions';
    const accountName = 'Accounts'
    const budgetName = 'Budget';
    const fundName = 'Fund';
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
            </View>
        <NavigationContainer  independent={true}>
            <Tab.Navigator 
            initialRouteName={transactionName} 
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
                    if(rn===transactionName){
                        iconName=focused?'cash':'cash-outline'
                    }
                    else if(rn===accountName){
                        iconName=focused?'file-tray-stacked':'file-tray-stacked-outline'
                    }
                    else if(rn===budgetName){
                        iconName=focused?'albums':'albums-outline'
                    }
                    else if(rn===fundName){
                        iconName=focused?'briefcase':'briefcase-outline'
                    }
                    return <Ionicons name={iconName} size={size} color={"white"}/>
                },
                
            })}>
                <Tab.Screen name={transactionName} component={TransactionStackNavigator}/>
                <Tab.Screen name={accountName} component={AccountStackNavigator}/>
                <Tab.Screen name={budgetName} component={BudgetStackNavigator}/>
                <Tab.Screen name={fundName} component={FundStackNavigator}/>
            </Tab.Navigator>
        </NavigationContainer>
        </SafeAreaView>
    )
}

export default FinancialPlannerContainer