import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
} from 'react-native'
import React, { useState } from 'react'
import SelectPicker from 'react-native-form-select-picker';
import DatePicker from 'react-native-modern-datepicker';

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
    const [activeState, setActive] = useState(active);
    const [hiddenState, setHidden] = useState(hidden);
    const [completedState,setCompleted] = useState(completed);
    const [everyState,setEvery] = useState(every);
    const [daysOfWeekState,setDaysOfWeek] = useState(daysOfWeek);
    const [totalTimeSpentState,setTotalTimeSpent] = useState(totalTimeSpent);
    const [isEditing,setIsEditing] = useState(false);
    const [isScheduleEditing,setIsScheduleEditing] = useState(false);
    function modifyStartDate(date){
      var parts = date.split('/')
      var year = parts[0];
      var month = parts[1];
      var day = parts[2].split(' ')[0]
      var date = new Date(year,month-1,day)
      setStartDate(date.toString())
    }
    function modifyDueDate(date){
      var parts = date.split('/')
      var year = parts[0];
      var month = parts[1];
      var day = parts[2].split(' ')[0]
      var date = new Date(year,month-1,day)
      setDueDate(date.toString())
    }
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
          {isEditing?
          <View>
            <Text className="text-white text-xl ">startDate : </Text>
            <DatePicker onSelectedChange={date=>modifyStartDate(date)} mode="calendar"/>
          </View>:
          <View className="flex-row">
            <Text className="text-white text-xl">startDate : {formatDate(new Date(startDateState))}</Text>
          </View>}
          {isEditing?
          <View>
            <Text className="text-white text-xl ">dueDate : </Text>
            <DatePicker onSelectedChange={date=>modifyDueDate(date)} mode="calendar"/>
          </View>:
          <View className="flex-row">
            <Text className="text-white text-xl">dueDate : {formatDate(new Date(dueDateState))}</Text>
          </View>}
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
                  <SelectPicker onValueChange={(value)=>setActive(value)} 
                  selected={activeState} className="flex-1 bg-gray-400 text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{activeState?.toString()}</Text>}
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">hidden : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setHidden(value)} 
                  selected={hiddenState} className="flex-1 bg-gray-400 text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{hiddenState?.toString()}</Text>}
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">completed : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setCompleted(value)} 
                  selected={completedState} className="flex-1 bg-gray-400 text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{completedState?.toString()}</Text>}
          </View>


        </View>
        <View className="align-center">
            <Text className="text-white text-xl font-bold">description</Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-gray-400 text-xl"
                multiline={true}
                numberOfLines={10}
                placeholder={String(descriptionState)}  value={descriptionState} Name='text' 
                onChangeText={text => setDescription(text)}/>:
                <Text className="text-white text-xl">{descriptionState}</Text>}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitDescription