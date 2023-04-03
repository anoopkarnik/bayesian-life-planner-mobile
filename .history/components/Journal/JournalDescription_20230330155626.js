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
            <Text className="text-white text-xl font-bold">text</Text>
            {isEditing?
                <TextInput 
                className="flex-1 bg-white text-xl"
                multiline={true}
                numberOfLines={10}
                placeholder={String(textState)}  value={textState} Name='text' 
                onChangeText={text => setText(text)}/>:
                <Text className="text-white text-xl">{textState}</Text>}
        </View>
      </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default JournalDescription;