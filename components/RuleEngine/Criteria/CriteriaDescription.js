import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
    CheckBox
  } from 'react-native'
  import React, { useState,useContext,useEffect } from 'react'
  import SelectPicker from 'react-native-form-select-picker';
import { deleteCriteria,modifyCriteriaParams } from '../../../api/RuleEngineAPI';
  import { useLayoutEffect } from 'react';
  import { useNavigation,useRoute } from '@react-navigation/native';
  import { ArrowLeftIcon } from 'react-native-heroicons/solid';

  import { UserContext } from '../../../context/UserContext';
  import { ConfigContext } from '../../../context/ConfigContext';
  import { ActiveContext } from '../../../context/ActiveContext';
  import DateTimePicker from 'react-native-modal-datetime-picker';
  
  const CriteriaDescription = () => {
    const {params:{id,createdAt,updatedAt,name,condition,
      category,criteriaType,active,value,categoryName,weightage}} = useRoute();
    const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [nameState,setName] = useState(name);
    const [conditionState,setCondition] = useState(condition)
    const [categoryState,setCategory] = useState(category)
    const [criteriaTypeState,setCriteriaType] = useState(criteriaType)
    const [activeState,setActive] = useState(active)
    const [valueState,setValue] = useState(value)
    const [categoryNameState,setCategoryName] = useState(categoryName)
    const [weightageState,setWeightage] = useState(weightage) 
    const [isEditing,setIsEditing] = useState(false)

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

    const onDelete = async() =>{
        await deleteCriteria(config,'Bearer '+user.accessToken,id)
        navigation.navigate("Normal",{criteriaName})
      }

    const onUpdate= async() =>{
      if(isEditing){
        // await props.refreshFunction(config,'Bearer '+ user.accessToken)
        await modifyCriteriaParams(config, 'Bearer '+user.accessToken,id,
        nameState,criteriaTypeState,conditionState,categoryState,weightageState,
        valueState,categoryNameState);
        setIsEditing(false);
      }
      else{
        setIsEditing(true);
      }
    };
  
  
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
          <View className="flex-row bg-gray-800 py-2">
              <Text className="text-white text-xl">Criteria Type: {criteriaType}</Text>
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
              <Text className="text-white text-xl mr-2">Value : </Text>
              {isEditing?
              <TextInput 
              className="flex-1 bg-white text-xl"
              placeholder={String(valueState)}  value={String(valueState)} Name='text' 
              onChangeText={text => setValue(text)}/>:
              <Text className="text-white text-xl">{String(valueState)}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
              <Text className="text-white text-xl mr-2">Weightage : </Text>
              {isEditing?
              <TextInput 
              className="flex-1 bg-white text-xl"
              placeholder={String(weightageState)}  value={String(weightageState)} Name='text' 
              onChangeText={text => setWeightage(text)}/>:
              <Text className="text-white text-xl">{String(weightageState)}</Text>}
          </View>
          <View className="flex-row bg-gray-800 py-2">
                <Text className=" text-white text-xl">Condition : </Text>
                <Text className="text-white text-xl">{conditionState?.toString()}</Text>
            </View>
            <View className="flex-row bg-gray-800 py-2">
                <Text className=" text-white text-xl">Category : </Text>
                <Text className="text-white text-xl">{categoryState?.toString()}</Text>
            </View>
            <View className="flex-row bg-gray-800 py-2">
                <Text className=" text-white text-xl">Category Name : </Text>
                <Text className="text-white text-xl">{categoryNameState?.toString()}</Text>
            </View>
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default CriteriaDescription;