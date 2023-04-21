import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
  CheckBox
} from 'react-native'
import React, { useState,useContext,useEffect } from 'react'
import SelectPicker from 'react-native-form-select-picker';
import { useLayoutEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { deleteFunds, modifyFundParams } from '../../api/FundAPI';

const TransactionDescription = () => {
  const {params:{id,createdAt,updatedAt,name,startDate,
    description,active,hidden,completed,amountAllocated,
    amountNeeded}} = useRoute();
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [nameState,setName] = useState(name);
    const [activeState, setActive] = useState(active);
    const [hiddenState, setHidden] = useState(hidden);
    const [completedState, setCompleted] = useState(completed);
    const [isEditing,setIsEditing] = useState(false);
    const [amountAllocatedState,setAmountAllocated] = useState(String(amountAllocated));
    const [amountNeededState,setAmountNeeded] = useState(String(amountNeeded));
    const [descriptionState,setDescription] = useState(description);
    const [startDateState,setStartDate] = useState(startDate)

    const onUpdate = async() =>{
      // await props.refreshFunction(config,'Bearer '+ user.accessToken)
      if(isEditing){
        await modifyFundParams(config, 'Bearer '+user.accessToken,
        id,createdAt,updatedAt,nameState,startDateState,
        descriptionState,amountAllocatedState,amountNeededState,
        activeState,hiddenState,
        completedState,user.id);
        setIsEditing(false);
      }
      else{
        setIsEditing(true);
      }
  };
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


  const onDelete = async() =>{
			await deleteFunds(config,'Bearer '+user.accessToken,id)
      navigation.navigate("Normal")
	}

  return (
    <SafeAreaView className="bg-black flex-1">
      <ScrollView>
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
            <Text className="text-white text-xl">id : {id}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">createdAt : {formatDate(new Date(createdAt))}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">updatedAt : {formatDate(new Date(updatedAt))}</Text>
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
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl mr-2">Amount Allocated : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={amountAllocatedState}  value={amountAllocatedState} Name='text' 
            onChangeText={text => setAmountAllocated(text)}/>:
            <Text className="text-white text-xl">{amountAllocatedState}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl mr-2">Amount Needed: </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={amountNeededState}  value={amountNeededState} Name='text' 
            onChangeText={text => setAmountNeeded(text)}/>:
            <Text className="text-white text-xl">{amountNeededState}</Text>}
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
        </View>
        <View className="align-center">
            <Text className="text-white text-xl font-bold">Description</Text>
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

export default TransactionDescription;