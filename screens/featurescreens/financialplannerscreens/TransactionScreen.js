import { View,Butchildton, Text,SafeAreaView,Image, TextInput, ScrollView,
  TouchableOpacity } from 'react-native'
  import { useIsFocused, useNavigation } from '@react-navigation/native'
  import { useLayoutEffect } from 'react'
  import { useState,useEffect } from 'react';
  import { useContext } from 'react';
  import { ConfigContext } from '../../../context/ConfigContext';
  import { UserContext } from '../../../context/UserContext';
  import TransactionList from '../../../components/Transaction/TransactionList';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  
  const TransactionScreen = () => {
      const navigation = useNavigation();
      const {user} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
      const isFocused = useIsFocused();
  
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])
  
      const Stack = createNativeStackNavigator();
  
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView>
          <TransactionList/>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default TransactionScreen