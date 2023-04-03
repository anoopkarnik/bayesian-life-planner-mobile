import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
  CheckBox
} from 'react-native'
import React, { useState,useContext } from 'react'
import SelectPicker from 'react-native-form-select-picker';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { deleteHabit } from '../../api/HabitAPI';

import { useLayoutEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { modifyHabitParams } from "../../api/HabitAPI";
import { modifyHabitSchedule } from "../../api/HabitAPI";
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';

const HabitDescription = () => {
  const {params:{id,createdAt,updatedAt,name,scheduleType,
    timeOfDay,timeTaken,startDate,dueDate,habitTypeName,streak,totalTimes,totalTimeSpent,
    description,active,hidden,completed,every,daysOfWeek}} = useRoute();
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [createAtState,setCreatedAt] = useState(createdAt);
    const [updatedAtState,setUpdatedAt] = useState(updatedAt);
    const [nameState,setName] = useState(name);
    const [timeOfDayState,setTimeOfDay] = useState(timeOfDay);
    const [timeTakenState,setTimeTaken] = useState(timeTaken);
    const [startDateState, setStartDate] = useState(startDate);
    const [dueDateState,setDueDate] = useState(dueDate);
    const [streakState,setStreak] = useState(streak);
    const [totalTimesState,setTotalTimes] = useState(totalTimes);
    const [descriptionState,setDescription] = useState(description);
    const [activeState, setActive] = useState(active);
    const [hiddenState, setHidden] = useState(hidden);
    const [completedState,setCompleted] = useState(completed);
    const [totalTimeSpentState,setTotalTimeSpent] = useState(totalTimeSpent);
    const [isEditing,setIsEditing] = useState(false);
    const  modifyStartDate= (date) =>{
      console.log(date)
      setStartDate(date)
    }
    function modifyDueDate(date){
      var parts = date.split('/')
      var year = parts[0];
      var month = parts[1];
      var day = parts[2].split(' ')[0]
      var date = new Date(year,month-1,day)
      setDueDate(date)
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

    const onUpdate = async() =>{
      // await props.refreshFunction(config,'Bearer '+ user.accessToken)
      if(isEditing){
        await modifyHabitParams(config, 'Bearer '+user.accessToken,
        id,nameState,startDateState,descriptionState,activeState,hiddenState,
        completedState,dueDateState,timeTakenState,streakState,totalTimesState,
        totalTimeSpentState,timeOfDayState);
        setIsEditing(false);
      }
      else{
        setIsEditing(true);
      }
  };

  const [scheduleTypeState,setScheduleType] = useState(scheduleType);
  const [everyState,setEvery] = useState(every);
  const [isScheduleEditing, setIsScheduleEditing] = useState(false);
  const [daysOfWeekState,setDaysOfWeek] = useState(daysOfWeek);
  const [showDays, setShowDays] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [scheduleTypes,setScheduleTypes] = useState(['onetime','daily','weekly',
  'monthly','yearly']);
  const [weekDays,setWeekDays] = useState([
    {value:'MONDAY',label:'M',isChecked:false},
    {value:'TUESDAY',label:'T',isChecked:false},
    {value:'WEDNESDAY',label:'W',isChecked:false},
    {value:'THURSDAY',label:'T',isChecked:false},
    {value:'FRIDAY',label:'F',isChecked:false},
    {value:'SATURDAY',label:'S',isChecked:false},
    {value:'SUNDAY',label:'S',isChecked:false},
  ]);
  const handleScheduleTypeChange = async(value) =>{
    setScheduleType(value);
    if(value==="weekly"){
      setShowDays(true);
    }
    else{
      setShowDays(false);
    }
  }

  const onhandleWeekDayChange = (value) =>{
   let temp = weekDays.map((weekDay)=>{
    if(value === weekDay.value){
      return {...weekDay,isChecked:!weekDay.isChecked};
    }
    return weekDay
   });
   let temp2 = temp.map((weekDay)=>{
    if (weekDay.isChecked){
      return weekDay.value
    }
   })
   var temp3 = temp2.filter(elm=>elm);
   setWeekDays(temp);
   setDaysOfWeek(temp3);
  }

  const onUpdateScheduleType = async() =>{
    // await props.refreshFunction(config,'Bearer '+ user.accessToken)
    if (isScheduleEditing){
      await modifyHabitSchedule(config, 'Bearer '+user.accessToken,
      id,scheduleType,scheduleTypeState,everyState,daysOfWeekState);
      setIsScheduleEditing(false);
    }
    else{
      setIsScheduleEditing(true);
    }
};

  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown:false,
    });
  }, [])
  const navigation = useNavigation();

  const habitTypeName2 = habitTypeName

  const onDelete = async() =>{
			await deleteHabit(config,'Bearer '+user.accessToken,id)
      navigation.navigate("Normal",{habitTypeName2})
	}


  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView className="my-10">
        <View className='relative'>
          <TouchableOpacity onPress={navigation.goBack}>
            <ArrowLeftIcon size={20} color='white'/>
          </TouchableOpacity>
        </View>
        <View className="my-5 mx-1 flex-row align-middle">
          <TouchableOpacity onPress={onUpdate}
          className="bg-gray-600 mx-2 rounded-lg p-2">
            {isEditing?
            <Text className="text-xl text-white">Update Item</Text>:
            <Text className="text-xl text-white">Edit Item</Text>}
          </TouchableOpacity>
          <TouchableOpacity  onPress={onUpdateScheduleType}
           className="bg-gray-600 mx-2 rounded-lg p-2">
            {isScheduleEditing?
            <Text className="text-xl text-white">Update Schedule</Text>:
            <Text className="text-xl text-white">Edit Schedule</Text>}
          </TouchableOpacity>
          <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
          onPress={onDelete}>
          <Text className="text-xl text-white">Delete</Text>
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
            <Text className="text-white text-xl">scheduleType : {scheduleTypeState}</Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">every : {everyState} </Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl ">daysOfWeek : {daysOfWeekState.length==0?"All days":String(daysOfWeekState)} </Text>
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">totalTimeSpent : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-gray-400 text-xl"
            placeholder={totalTimeSpentState}  value={totalTimeSpentState} Name='text' 
            onChangeText={text => setTotalTimeSpent(String(text))}/>:
            <Text className="text-white text-xl">{totalTimeSpentState}</Text>}
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
                onChangeText={text => setTimeOfDay(String(text))}/>:
                <Text className="text-white text-xl">{timeOfDayState}</Text>}
          </View>
          <View className="flex-row">
            <Text className="text-white text-xl">timeTaken : </Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-gray-400 text-xl"
                placeholder={String(timeTakenState)}  value={timeTakenState} Name='text' 
                onChangeText={text => setTimeTaken(String(text))}/>:
                <Text className="text-white text-xl">{timeTakenState}</Text>}
          </View>
          {isEditing?
          <View>
            <Text className="text-white text-xl ">startDate : </Text>
            <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
          </View>:
          <View className="flex-row">
            <Text className="text-white text-xl">startDate : {formatDate(new Date(startDateState))}</Text>
          </View>}
          {/* {isEditing?
          <View>
            <Text className="text-white text-xl ">dueDate : </Text>
            <DatePicker 
            onSelectedChange={date=>modifyDueDate(date)} mode="calendar" 
            />
          </View>:
          <View className="flex-row">
            <Text className="text-white text-xl">dueDate : {formatDate(new Date(dueDateState))}</Text>
          </View>} */}
          <View className="flex-row">
            <Text className="text-white text-xl">Streak : </Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-gray-400 text-xl"
                placeholder={String(streakState)}  value={streakState} Name='text' 
                onChangeText={text => setStreak(String(text))}/>:
                <Text className="text-white text-xl">{streakState}</Text>}
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">totalTimes : </Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-gray-400 text-xl"
                placeholder={String(totalTimesState)}  value={totalTimesState} Name='text' 
                onChangeText={text => setTotalTimes(String(text))}/>:
                <Text className="text-white text-xl">{totalTimesState}</Text>}
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">active : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setActive(value)} 
                  selected={activeState?.toString()} className="flex-1 bg-gray-400 text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{activeState?.toString()}</Text>}
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">hidden : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setHidden(value)} 
                  selected={hiddenState?.toString()} className="flex-1 bg-gray-400 text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{hiddenState?.toString()}</Text>}
          </View>
          <View className="flex-row">
            <Text className=" text-white text-xl">completed : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setCompleted(value)} 
                  selected={completedState?.toString()} className="flex-1 bg-gray-400 text-xl">
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
        {isScheduleEditing?
        <View>
          <View className="flex-row">
            <SelectPicker onValueChange={(value)=>handleScheduleTypeChange(value)} 
                  selected={scheduleTypeState} className="flex-1 bg-gray-400 text-xl">
                    {scheduleTypes.map((schedule)=>(
                         <SelectPicker.Item label={schedule} value={schedule}/>
                    ))}
            </SelectPicker>
            <TextInput 
                className="flex-1 bg-gray-400 text-xl"
                placeholder={String(everyState)}  value={everyState} Name='text' 
                onChangeText={text => setEvery(String(text))}/>
          </View>
          {showDays?
          <View className="my-5 flex-row">
            {weekDays.map((x,i)=>(
              <Text>
              
              <CheckBox
              className="flex-1 bg-gray-400 text-xl"
                isChecked={x.isChecked}
                onClick={()=>onhandleWeekDayChange(x.value)}
              />  
              <Text className="text-white text-xl font-bold">{x.label}</Text>
              </Text>
            
            ))}
          </View>:null}

        </View> :null}
      </ScrollView>
    </SafeAreaView>
  )
}

export default HabitDescription;