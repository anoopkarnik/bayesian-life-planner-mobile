import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'

import { useLayoutEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

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
        <View className='relative'>
          <TouchableOpacity onPress={navigation.goBack}
              className='absolute top-14 left-5 p-2 rounded-full'>
            <ArrowLeftIcon size={20} color='white'/>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitDescription