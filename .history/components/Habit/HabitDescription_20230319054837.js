import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'

import { useLayoutEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

const HabitDescription = () => {
  const {params:{id,createdAt,updatedAt,name,scheduleType,
    timeOfDay,timeTaken,startDate,dueDate,habitTypeName,streak,totalTimes,
    description,active,hidden,completed,every,daysOfWeek}} = useRoute();

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
          <TouchableOpacity onPress={navigation.goBack}>
            <ArrowLeftIcon size={20} color='white'/>
          </TouchableOpacity>
        </View>
        <View >
        <Text className="text-white">Habit Type : {habitTypeName}</Text>
          <Text className="text-white">{name}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitDescription