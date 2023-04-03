import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native'
import React from 'react'

import { useLayoutEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

const HabitDescription = () => {
  const {params:{id,createdAt,updatedAt,name,scheduleType,
    timeOfDay,timeTaken,startDate,dueDate,habitTypeName,streak,totalTimes,
    description,active,hidden,completed,every,daysOfWeek}} = useRoute();
    function formatDate(newDate) {
      const months = {0: 'January',1: 'February',2: 'March',3: 'April',
      4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September',
        9: 'October', 10: 'November',  11: 'December' }
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const year = newDate.getFullYear()
      const date = newDate.getDate()
      const monthIndex = newDate.getMonth()
      const monthName = months[newDate.getMonth()]
      const dayName = days[newDate.getDay()] // Thu
      const formatted = `${dayName}, ${date} ${monthName} ${year}`
      return formatted.toString()
    }

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
        <View className="my-5 mx-1">
          <TouchableOpacity className="bg-gray-600">
            <Text className="text-xl text-white">Edit Item</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">id </Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{id}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">createdAt</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{formatDate(new Date(createdAt))}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">updatedAt</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{formatDate(new Date(updatedAt))}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">name</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{name}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">scheduleType</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{scheduleType}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">timeOfDay</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{timeOfDay}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">timeTaken</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{timeTaken}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">startDate</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{formatDate(new Date(startDate))}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">dueDate</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{formatDate(new Date(dueDate))}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">habitType</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{habitTypeName}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">streak</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{streak}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">totalTimes</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{totalTimes}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">active</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{String(active)}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">hidden</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{String(hidden)}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">completed</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{String(completed)}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">every</Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{every}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="w-1/4 text-white">daysOfWeek </Text>
            <Text className="w-1/4 text-white">-</Text>
            <Text className="w-2/4 text-white">{daysOfWeek.length==0?"All days":String(daysOfWeek)} </Text>
          </View>
        </View>
        <View className="flex">
            <Text className="text-white">description</Text>
            <Text className="text-white">{description}</Text>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitDescription