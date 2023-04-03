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
          <View className="flex flex-row">
            <Text className="w-1/3 text-white">id </Text>
            <Text className="w-1/3 text-white">:</Text>
            <Text className="w-1/3 text-white">{id}</Text>
          </View>
          <Text className="text-white">createdAt : {createdAt}</Text>
          <Text className="text-white">updatedAt : {updatedAt}</Text>
          <Text className="text-white">name : {name}</Text>
          <Text className="text-white">scheduleType : {scheduleType}</Text>
          <Text className="text-white">timeOfDay : {timeOfDay}</Text>
          <Text className="text-white">timeTaken : {timeTaken}</Text>
          <Text className="text-white">startDate : {startDate}</Text>
          <Text className="text-white">dueDate : {dueDate}</Text>
          <Text className="text-white">habitTypeName : {habitTypeName }</Text>
          <Text className="text-white">streak : {streak}</Text>
          <Text className="text-white">totalTimes : {totalTimes}</Text>
          <Text className="text-white">description : {description}</Text>
          <Text className="text-white">active : {active}</Text>
          <Text className="text-white">hidden : {hidden }</Text>
          <Text className="text-white">completed : {completed}</Text>
          <Text className="text-white">every : {every}</Text>
          <Text className="text-white">daysOfWeek : {daysOfWeek}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitDescription