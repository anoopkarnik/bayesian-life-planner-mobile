import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
    CheckBox
  } from 'react-native'
  import React, { useState,useContext,useEffect } from 'react'
  import SelectPicker from 'react-native-form-select-picker';
  import { deleteRule } from '../../api/RuleAPI';
  import { useLayoutEffect } from 'react';
  import { useNavigation,useRoute } from '@react-navigation/native';
  import { ArrowLeftIcon } from 'react-native-heroicons/solid';

  import { UserContext } from '../../context/UserContext';
  import { ConfigContext } from '../../context/ConfigContext';
  import { ActiveContext } from '../../context/ActiveContext';
  import DateTimePicker from 'react-native-modal-datetime-picker';
  
  const RuleDescription = () => {
    const {params:{id,createdAt,updatedAt,name,description,
        active,hidden,ruleType,weightage,value,conditionType}} = useRoute();
      const {user} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
     
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
  
    const goalTypeName2 = goalTypeName
  
    const onDelete = async() =>{
              await deleteGoal(config,'Bearer '+user.accessToken,id)
        navigation.navigate("Normal",{goalTypeName2})
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
              <Text className="text-white text-xl">goalType : {goalTypeName}</Text>
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
              <Text className="text-white text-xl">Current Level : {Math.round(completedPercentage)}</Text>
            </View>
            {/* <View className="flex-row bg-gray-800 py-2">
              <Text className="text-white text-xl">Aggregated Subgoals Level : {Math.round(childCompletedPercentage)}</Text>
            </View> */}
            <View className="flex-row bg-gray-800 py-2">
              <Text className="text-white text-xl">Working Level : {Math.round(workPercentage)}</Text>
            </View>
            <View className="flex-row bg-gray-800 py-2">
              <Text className="text-white text-xl">Expected Level : {Math.round(expected_level)}</Text>
            </View>
            <View className="flex-row bg-gray-800 py-2">
              <Text className="text-white text-xl mr-2">Name : </Text>
              {isEditing?
              <TextInput 
              className="flex-1 bg-white text-xl"
              placeholder={nameState}  value={nameState} Name='text' 
              onChangeText={text => setName(text)}/>:
              <Text className="text-white text-xl">{nameState}</Text>}
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
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default RuleDescription;