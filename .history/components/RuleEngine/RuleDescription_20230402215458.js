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

    const onDelete = async() =>{
        await deleteRule(config,'Bearer '+user.accessToken,ruleType,id)
        navigation.navigate("Description",{})
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
            <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
            onPress={onDelete}>
            <Text className="text-xl text-white">Delete</Text>
          </TouchableOpacity>
          </View>
          <View>
          <View className="flex-row bg-gray-800 py-2">
              <Text className="text-white text-xl">ruleType: {ruleType}</Text>
            </View>
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
                <Text className=" text-white text-xl">active : </Text>
                <Text className="text-white text-xl">{name}</Text>
            </View>
            <View className="flex-row bg-gray-800 py-2">
                <Text className=" text-white text-xl">active : </Text>
                <Text className="text-white text-xl">{active?.toString()}</Text>
            </View>
            <View className="flex-row bg-gray-800 py-2">
              <Text className=" text-white text-xl">hidden : </Text>
              <Text className="text-white text-xl">{hidden?.toString()}</Text>
            </View>
            <View className="flex-row bg-gray-800 py-2">
                <Text className=" text-white text-xl">weightage: </Text>
                <Text className="text-white text-xl">{weightage?.toString()}</Text>
            </View>
            <View className="flex-row bg-gray-800 py-2">
                <Text className=" text-white text-xl">value : </Text>
                <Text className="text-white text-xl">{value?.toString()}</Text>
            </View>
            <View className="flex-row bg-gray-800 py-2">
                <Text className=" text-white text-xl">Condition Type : </Text>
                <Text className="text-white text-xl">{conditionType?.toString()}</Text>
            </View>
          <View className="align-center">
              <Text className="text-white text-xl font-bold">description</Text>
                  <Text className="text-white text-xl">{description}</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default RuleDescription;