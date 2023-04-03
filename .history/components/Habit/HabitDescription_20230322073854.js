import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
} from 'react-native'
import React, { useState } from 'react'
import SelectPicker from 'react-native-form-select-picker';

import { useLayoutEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';

const HabitDescription = () => {
  const {params:{id,createdAt,updatedAt,name,scheduleType,
    timeOfDay,timeTaken,startDate,dueDate,habitTypeName,streak,totalTimes,totalTimeSpent,
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
    const [activeState, setActive] = useState({id:true,item:'True'});
    const [hiddenState, setHidden] = useState(hidden);
    const [completedState,setCompleted] = useState(completed);
    const [everyState,setEvery] = useState(every);
    const [daysOfWeekState,setDaysOfWeek] = useState(daysOfWeek);
    const [totalTimeSpentState,setTotalTimeSpent] = useState(totalTimeSpent);
    const [isEditing,setIsEditing] = useState(false);
    const [isScheduleEditing,setIsScheduleEditing] = useState(false);

    const options = [
      {id:true ,item:'True'},
      {id:false,item:'False'}
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
          <TouchableOpacity onPress={()=>setIsEditing(!isEditing)}
          className="bg-gray-600 mx-2 rounded-lg p-2">
            {isEditing?
            <Text className="text-xl text-white">Update Item</Text>:
            <Text className="text-xl text-white">Edit Item</Text>}
          </TouchableOpacity>
          <TouchableOpacity  onPress={()=>setIsScheduleEditing(!isScheduleEditing)}
           className="bg-gray-600 mx-2 rounded-lg p-2">
            {isScheduleEditing?
            <Text className="text-xl text-white">Update Schedule</Text>:
            <Text className="text-xl text-white">Edit Schedule</Text>}
          </TouchableOpacity>
        </View>
        <View>
        <View className="flex-row">
            <Text className="text-white text-xl">habitType : {habitTypeName}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">id : {id}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">createdAt : {formatDate(new Date(createAtState))}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">updatedAt : {formatDate(new Date(updatedAtState))}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">scheduleType : {scheduleType}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">every : {every} </Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl ">daysOfWeek : {daysOfWeek.length==0?"All days":String(daysOfWeek)} </Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">totalTimeTaken : </Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl mr-2">name : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-gray-400 text-xl"
            placeholder={nameState}  value={nameState} Name='text' 
            onChangeText={text => setName(text)}/>:
            <Text className="text-white text-xl">{nameState}</Text>}
          </View>
          <View className="flex flex-row">
            <Text className="text-white text-xl">timeOfDay : </Text>
              {isEditing?
                <TextInput 
                className="flex-1 bg-gray-400 text-xl"
                placeholder={String(timeOfDayState)}  value={timeOfDayState} Name='text' 
                onChangeText={text => setTimeOfDay(text)}/>:
                <Text className="text-white text-xl">{timeOfDayState}</Text>}
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">timeTaken : </Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-gray-400 text-xl"
                placeholder={String(timeTakenState)}  value={timeTakenState} Name='text' 
                onChangeText={text => setTimeTaken(text)}/>:
                <Text className="text-white text-xl">{timeTakenState}</Text>}
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl ">startDate : {formatDate(new Date(startDate))}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">dueDate : {formatDate(new Date(dueDate))}</Text>
          </View>

          <View className="flex-row">
            <Text className="text-white text-xl">Streak : </Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-gray-400 text-xl"
                placeholder={String(streakState)}  value={streakState} Name='text' 
                onChangeText={text => setStreak(text)}/>:
                <Text className="text-white text-xl">{streakState}</Text>}
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">totalTimes : </Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-gray-400 text-xl"
                placeholder={String(totalTimesState)}  value={totalTimesState} Name='text' 
                onChangeText={text => setTotalTimes(text)}/>:
                <Text className="text-white text-xl">{totalTimesState}</Text>}
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">active : </Text>
            {isEditing?
                  <SelectBox
                  options={options}
                  value={activeState}
                  onChange={(val)=>setActive(val)}
                  hideInputFilter={false}
                  className="bg-gray-400 text-white text-xl"
                />:  <Text className="text-white text-xl">{activeState.id}</Text>}
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">hidden : </Text>
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">completed : </Text>
          </View>


        </View>
        <View className="align-center">
            <Text className="text-white text-xl font-bold">description</Text>
            <Text className="text-white text-xl">{description}</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitDescription