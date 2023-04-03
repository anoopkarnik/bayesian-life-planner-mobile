import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

import { useLayoutEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

const HabitDescription = () => {
  const {params:{id,createdAt,updatedAt,name,scheduleType,
    timeOfDay,timeTaken,startDate,dueDate,habitTypeName,streak,totalTimes,
    description,active,hidden,completed,every,daysOfWeek}} = useRoute();
    const [createAtState,setCreatedAt] = useState(createdAt);
    const [updatedAtState,setUpdatedAt] = useState(updatedAt);
    const [nameState,setName] = useState(name);
    const [scheduleTypeState, setScheduleType] = useState(scheduleType);
    const [timeOfDayState,setTimeOfDay] = useState(timeOfDay);
    const [timeTakenState,setTimeTaken] = useState(timeTaken);
    const [startDateState, setStartDate] = useState(startDate);
    const [dueDateState,setDueDate] = useState(dueDate);
    const [habitTypeNameState,setHabitTypeName] = useState(habitTypeName);
    const [streakState,setStreak] = useState(streak);
    const [totalTimesState,setTotalTimes] = useState(totalTimes);
    const [descriptionState,setDescription] = useState(description);
    const [activeState, setActive] = useState(active);
    const [hiddenState, setHidden] = useState(hidden);
    const [completedState,setCompleted] = useState(completed);
    const [everyState,setEvery] = useState(every);
    const [daysOfWeekState,setDaysOfWeek] = useState(daysOfWeek);

    const options = [
      {value:'true' ,label:'True'},
      {value:'false',label:'False'},
      {value:null,label:null}
    ]

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
        <View className="my-5 mx-1 flex-row align-middle">
          <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2">
            <Text className="text-xl text-white">Edit Item</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2">
            <Text className="text-xl text-white">Edit Description</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View className="flex-row">
            <Text className="text-white text-xl">id : {id}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">createdAt : {formatDate(new Date(createdAt))}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">updatedAt : {formatDate(new Date(updatedAt))}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">name : {name}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">scheduleType : {scheduleType}</Text>
          </View>
          <View className="flex flex-row">
            <Text className="text-white text-xl">timeOfDay : {timeOfDay}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">timeTaken : {timeTaken}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl ">startDate : {formatDate(new Date(startDate))}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">dueDate : {formatDate(new Date(dueDate))}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">habitType : {habitTypeName}</Text>
          </View>
          <View>
            <Text className="text-white text-xl">streak : {streak}</Text>
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">totalTimes : {totalTimes}</Text>
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">active : {String(active)}</Text>
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">hidden : {String(hidden)}</Text>
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">completed : {String(completed)}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">every : {every}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl ">daysOfWeek : {daysOfWeek.length==0?"All days":String(daysOfWeek)} </Text>
          </View>
        </View>
        <View className="flex align-items-center">
            <Text className="text-white text-xl font-bold">description</Text>
            <Text className="text-white">{description}</Text>
          </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitDescription