
import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
    CheckBox
  } from 'react-native'

  import React, { useState,useContext,useEffect } from 'react'
  import SelectPicker from 'react-native-form-select-picker';
  import { useLayoutEffect } from 'react';
  import { useNavigation,useRoute } from '@react-navigation/native';
  import { ArrowLeftIcon } from 'react-native-heroicons/solid';

  import { UserContext } from '../../../context/UserContext';
  import { ConfigContext } from '../../../context/ConfigContext';
  import { ActiveContext } from '../../../context/ActiveContext';
  import DateTimePicker from 'react-native-modal-datetime-picker';
  import {modifyCriteriaSetParams,modifyRuleParams,modifyRuleSetParams}
  from '../../../api/RuleEngineAPI';
  
  const RuleEngineDescription = () => {
    const {params:{id,createdAt,updatedAt,name,childrenLength,type}} = useRoute();
      const [isEditing,setIsEditing] = useState(false);
      const {user, setUser} = useContext(UserContext);
      const {config} = useContext(ConfigContext);
      const [nameState,setName] = useState(name);
      const [active, setActive] =useState(active);
      const [children, setChildren] = useState([]);
      const options = [
        {value:'true' ,label:'True'},
        {value:'false',label:'False'},
        {value:null,label:null}
      ]
  
      const onUpdate= async() =>{
        if (isEditing==true){
          if (type=== "Criteria Set") {
            await modifyCriteriaSetParams(config, 'Bearer ' + user.accessToken, id,nameState)
          }
          else if (type === "Rule") {
            await modifyRuleParams(config, 'Bearer ' + user.accessToken, id,nameState)
          }
          else if (type === "Rule Set") {
            await modifyRuleSetParams(config, 'Bearer ' + user.accessToken, id,nameState)
          }
          setIsEditing(false);
        }
        else{
          setIsEditing(true);
        }

    };
    
    function formatDate(date) {
      const months = {0: 'January',1: 'February',2: 'March',3: 'April',
      4: 'May', 5: 'June', 6: 'July', 7: 'August', 8: 'September',
        9: 'October', 10: 'November',  11: 'December' }
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
      const time = date.getTime()
      const newDate = new Date(time - ((5*60)+30)*60*1000)
      const year = newDate.getFullYear()
      const date2 = newDate.getDate()
      const monthIndex = newDate.getMonth()
      const monthName = months[newDate.getMonth()]
      const dayName = days[newDate.getDay()] // Thu
      const formatted = `${dayName}, ${date2} ${monthName} ${year}`
      return formatted.toString()
    }

    const criteriaName = 'Criteria';
     
    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown:false,
      });
    }, [])
    const navigation = useNavigation();

  
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
              <Text className="text-white text-xl mr-2">Name : </Text>
              {isEditing?
              <TextInput 
              className="flex-1 bg-white text-xl"
              placeholder={nameState}  value={nameState} Name='text' 
              onChangeText={text => setName(text)}/>:
              <Text className="text-white text-xl">{nameState}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
              <Text className="text-white text-xl">Children Length: {String(childrenLength)}</Text>
            </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default RuleEngineDescription;