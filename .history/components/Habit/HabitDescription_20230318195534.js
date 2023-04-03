import { View, Button,Text,SafeAreaView,ScrollView } from 'react-native'
import React from 'react'

import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';

const HabitDescription = () => {
  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown:false,
    });
  }, [])
  const navigation = useNavigation();


  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView className="my-10">

      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitDescription