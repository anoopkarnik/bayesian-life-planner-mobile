import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
  CheckBox
} from 'react-native'
import React, { useBadHabite,useContext } from 'react'
import SelectPicker from 'react-native-form-select-picker';
import { deleteBadHabit } from '../../api/BadHabitAPI';
import { useLayoutEffect } from 'react';
import { useNavigation,useRoute } from '@react-navigation/native';
import { ArrowLeftIcon } from 'react-native-heroicons/solid';
import { modifyBadHabitParams } from "../../api/BadHabitAPI";
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import DateTimePicker from 'react-native-modal-datetime-picker';

const BadHabitDescription = () => {
  const {params:{id,createdAt,updatedAt,name,value,
    badHabitTypeName, description,active,hidden,completed,startDate}} = useRoute();
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [createAtBadHabite,setCreatedAt] = useBadHabite(createdAt);
    const [updatedAtBadHabite,setUpdatedAt] = useBadHabite(updatedAt);
    const [nameBadHabite,setName] = useBadHabite(name);
    const [descriptionBadHabite,setDescription] = useBadHabite(description);
    const [activeBadHabite, setActive] = useBadHabite(active);
    const [hiddenBadHabite, setHidden] = useBadHabite(hidden);
    const [completedBadHabite,setCompleted] = useBadHabite(completed);
    const [valueBadHabite, setValue] = useBadHabite(value);
    const [isEditing,setIsEditing] = useBadHabite(false);

   
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
        await modifyBadHabitParams(config, 'Bearer '+user.accessToken,
        id,nameBadHabite,startDate,descriptionBadHabite,activeBadHabite,
        hiddenBadHabite,completedBadHabite,valueBadHabite);
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

  const badHabitTypeName2 = badHabitTypeName

  const onDelete = async() =>{
			await deleteBadHabit(config,'Bearer '+user.accessToken,id)
      navigation.navigate("Normal",{badHabitTypeName2})
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
            <Text className="text-white text-xl">badHabitType : {badHabitTypeName}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">id : {id}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">createdAt : {formatDate(new Date(createAtBadHabite))}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl">updatedAt : {formatDate(new Date(updatedAtBadHabite))}</Text>
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className="text-white text-xl mr-2">name : </Text>
            {isEditing?
            <TextInput 
            className="flex-1 bg-white text-xl"
            placeholder={nameBadHabite}  value={nameBadHabite} Name='text' 
            onChangeText={text => setName(text)}/>:
            <Text className="text-white text-xl">{nameBadHabite}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">active : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setActive(value)} 
                  selected={activeBadHabite?.toString()} className="flex-1 bg-white text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{activeBadHabite?.toString()}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
            <Text className=" text-white text-xl">hidden : </Text>
            {isEditing?
                  <SelectPicker onValueChange={(value)=>setHidden(value)} 
                  selected={hiddenBadHabite?.toString()} className="flex-1 bg-white text-xl">
                    <SelectPicker.Item label="true" value="true"/>
                    <SelectPicker.Item label="false" value="false"/>
                  </SelectPicker> : 
                  <Text className="text-white text-xl">{hiddenBadHabite?.toString()}</Text>}
          </View>
        </View>
        <View className="align-center">
            <Text className="text-white text-xl font-bold">description</Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-white text-xl"
                multiline={true}
                numberOfLines={10}
                placeholder={String(descriptionBadHabite)}  value={descriptionBadHabite} Name='text' 
                onChangeText={text => setDescription(text)}/>:
                <Text className="text-white text-xl">{descriptionBadHabite}</Text>}
        </View>
      
      </ScrollView>
    </SafeAreaView>
  )
}

export default BadHabitDescription;