import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
  CheckBox
} from 'react-native'
import React, { useState,useContext } from 'react'
import SelectPicker from 'react-native-form-select-picker';
import { deleteJournal } from '../../api/JournalAPI';
import { useLayoutEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { modifyJournalParams } from "../../api/JournalAPI";
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import DateTimePicker from 'react-native-modal-datetime-picker';

const JournalDescription = () => {
  const {params:{id,createdAt,updatedAt,name,
    startDate,journalTypeName,text, description,active,hidden,completed}} = useRoute();
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [nameState,setName] = useState(name);
    const [activeState, setActive] = useState(active);
    const [hiddenState, setHidden] = useState(hidden);
    const [isEditing,setIsEditing] = useState(false);
    const [textState,setText] = useState(text);
    


    const onUpdate = async() =>{
      // await props.refreshFunction(config,'Bearer '+ user.accessToken)
      if(isEditing){
        await modifyJournalParams(config, 'Bearer '+user.accessToken,
        id,nameState,startDate,description,activeState,hiddenState,
        completed,textState);
        setIsEditing(false);
      }
      else{
        setIsEditing(true);
      }
  };


  useLayoutEffect(() => {
    navigation.setOptions({
        headerShown:false,
    });
  }, [])
  const navigation = useNavigation();

  const journalTypeName2 = journalTypeName

  const onDelete = async() =>{
			await deleteJournal(config,'Bearer '+user.accessToken,id)
      navigation.navigate("Normal",{journalTypeName2})
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
          <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
          onPress={onDelete}>
          <Text className="text-xl text-white">Delete</Text>
        </TouchableOpacity>
        </View>
        <View>
        <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">journalType : {journalTypeName}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">id : {id}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">createdAt : {formatDate(new Date(createAtState))}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">updatedAt : {formatDate(new Date(updatedAtState))}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">scheduleType : {scheduleTypeState}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">every : {everyState} </Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl ">daysOfWeek : {daysOfWeekState.length==0?"All days":String(daysOfWeekState)} </Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">totalTimeSpent : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={totalTimeSpentState}  value={totalTimeSpentState} Name='text' 
            onChangeText={text => setTotalTimeSpent(String(text))}/>:
            <Text className="text-white text-xl">{totalTimeSpentState}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl mr-2">name : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={nameState}  value={nameState} Name='text' 
            onChangeText={text => setName(text)}/>:
            <Text className="text-white text-xl">{nameState}</Text>}
          </View>
          <View className="flex flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">timeOfDay : </Text>
              {isEditing?
                <TextInput 
                className="flex-1 bg-white text-xl"
                placeholder={String(timeOfDayState)}  value={timeOfDayState} Name='text' 
                onChangeText={text => setTimeOfDay(String(text))}/>:
                <Text className="text-white text-xl">{timeOfDayState}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">timeTaken : </Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-white text-xl"
                placeholder={String(timeTakenState)}  value={timeTakenState} Name='text' 
                onChangeText={text => setTimeTaken(String(text))}/>:
                <Text className="text-white text-xl">{timeTakenState}</Text>}
          </View>
          {isEditing?
          <View className='flex-row bg-gray-800 py-2'>
            <Text className="text-white text-xl ">startDate : </Text>
              <TouchableOpacity onPress={()=>setShowStartDate(!showStartDate)}
              className="flex-1 bg-white text-xl" placeholder="Start Date">
                <Text className="text-xl">{startDateState.getDate()}-
                {startDateState.getMonth()}-{startDateState.getFullYear()}</Text>  
              </TouchableOpacity>       
            {showStartDate?
              <DateTimePicker
              isVisible={showStartDate}
              mode="date"
              onConfirm={handleStartDate}
              onCancel={()=>showStartDate(false)}
            />
         :null}
          </View>:
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">startDate : {startDateState.getDate()}-
              {startDateState.getMonth()}-{startDateState.getFullYear()}
              </Text>
          </View>}
          {isEditing?
          <View className='flex-row bg-gray-800 py-2'>
            <Text className="text-white text-xl ">dueDate : </Text>
            <TouchableOpacity onPress={()=>setShowDueDate(!showDueDate)}
              className="flex-1 bg-white  text-xl" placeholder="Due Date">
                <Text className="text-xl">{dueDateState.getDate()}-
                {dueDateState.getMonth()}-{dueDateState.getFullYear()}</Text>  
              </TouchableOpacity>    
            {showDueDate?
              <DateTimePicker
              isVisible={showDueDate}
              mode="date"
              onConfirm={handleDueDate}
              onCancel={()=>showDueDate(false)}
            />
         :null}
          </View>:
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">dueDate : {dueDateState.getDate()}-
              {dueDateState.getMonth()}-{dueDateState.getFullYear()}
              </Text>
          </View>}
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">Streak : </Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-white text-xl"
                placeholder={String(streakState)}  value={streakState} Name='text' 
                onChangeText={text => setStreak(String(text))}/>:
                <Text className="text-white text-xl">{streakState}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">totalTimes : </Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-white text-xl"
                placeholder={String(totalTimesState)}  value={totalTimesState} Name='text' 
                onChangeText={text => setTotalTimes(String(text))}/>:
                <Text className="text-white text-xl">{totalTimesState}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">active : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setActive(value)} 
                  selected={activeState?.toString()} className="flex-1 bg-white text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{activeState?.toString()}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">hidden : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setHidden(value)} 
                  selected={hiddenState?.toString()} className="flex-1 bg-white text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{hiddenState?.toString()}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">completed : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setCompleted(value)} 
                  selected={completedState?.toString()} className="flex-1 bg-white text-xl">
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
                className="flex-1 bg-white text-xl"
                multiline={true}
                numberOfLines={10}
                placeholder={String(descriptionState)}  value={descriptionState} Name='text' 
                onChangeText={text => setDescription(text)}/>:
                <Text className="text-white text-xl">{descriptionState}</Text>}
        </View>
        {isScheduleEditing?
        <View>
          <View className="flex-row bg-gray-800 py-2">
            <SelectPicker onValueChange={(value)=>handleScheduleTypeChange(value)} 
                  selected={scheduleTypeState} className="flex-1 bg-white text-xl">
                    {scheduleTypes.map((schedule)=>(
                         <SelectPicker.Item label={schedule} value={schedule}/>
                    ))}
            </SelectPicker>
            <TextInput 
                className="flex-1 bg-white text-xl"
                placeholder={String(everyState)}  value={everyState} Name='text' 
                onChangeText={text => setEvery(String(text))}/>
          </View>
          {showDays?
          <View className="my-5 flex-row">
            {weekDays.map((x,i)=>(
              <Text>
              
              <CheckBox
              className="flex-1 bg-white text-xl"
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

export default JournalDescription;