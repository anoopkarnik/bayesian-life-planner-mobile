import { View,Button, Text,SafeAreaView,Image, TextInput, ScrollView,
  TouchableOpacity } from 'react-native'
  import { useIsFocused, useNavigation } from '@react-navigation/native'
  import { useLayoutEffect } from 'react'
  import { useState,useEffect } from 'react';
  import { useContext } from 'react';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RuleEngineList from '../../../components/RuleEngine/RuleEngine/RuleEngineList';
  
  const RuleEngineScreen = () => {

      const navigation = useNavigation();
      const isFocused = useIsFocused();
  
      useLayoutEffect(() => {
          navigation.setOptions({
              headerShown:false,
          });
      }, [])
  
      useEffect(() => {
          isFocused
        }, [isFocused]);

  
      const Stack = createNativeStackNavigator();
    return (
      
      <SafeAreaView className="bg-black flex-1">
        <ScrollView>
          <RuleEngineList name="Criteria Set"/>
          <RuleEngineList name="Rule"/>
          <RuleEngineList name="Rule Set"/>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default RuleEngineScreen