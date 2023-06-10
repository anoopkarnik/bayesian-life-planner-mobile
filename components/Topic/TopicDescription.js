import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
    CheckBox
  } from 'react-native'
  import React, { useState,useContext,useEffect } from 'react'
  import SelectPicker from 'react-native-form-select-picker';
import { updateTopicParagraph,addTopicItem,deleteTopicItem } from '../../api/TopicAPI';
  import { useLayoutEffect } from 'react';
  import { useNavigation,useRoute } from '@react-navigation/native';
  import { ArrowLeftIcon } from 'react-native-heroicons/solid';

  import { UserContext } from '../../context/UserContext';
  import { ConfigContext } from '../../context/ConfigContext';
  import { ActiveContext } from '../../context/ActiveContext';
  import DateTimePicker from 'react-native-modal-datetime-picker';
  import TrashIcon from 'react-native-heroicons/solid';
import Item from './Item';
import { deleteTopic } from '../../api/TopicAPI';
  
  const TopicDescription = () => {
    const {params:{id,createdAt,updatedAt,name,paragraph,itemResponses,topicType
    }} = useRoute();
    const [isEditing,setIsEditing] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [nameState,setName] = useState(name);
    const [paragraphState,setParagraph] = useState(paragraph);
    const [itemsState,setItems] = useState(itemResponses)
    const {showActive} = useContext(ActiveContext);
    const [item,setItem] = useState('')
    const [buttonName,setButtonName] = useState('Edit Paragraph')
  

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
     
    useLayoutEffect(() => {
      navigation.setOptions({
          headerShown:false,
      });
    }, [])
    const navigation = useNavigation();

    const addItem = async() =>{
      await addTopicItem(config,'Bearer '+user.accessToken,id,item)
    }

    const editParagraph = async() =>{
      if (isEditing===false){
        setIsEditing(true)
        setButtonName('Update Paragraph')
      }
      else{
        await updateTopicParagraph(config,'Bearer '+user.accessToken,id,paragraphState)
        setIsEditing(false)
        setButtonName('Edit Paragraph')
      }
    }

    const onDelete = async() =>{
        await deleteTopic(config,'Bearer '+user.accessToken,id)
        navigation.navigate("Normal",{})
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
          {/* <TouchableOpacity onPress={onUpdate}
          className="bg-gray-600 mx-2 rounded-lg p-2">
            {isEditing?
            <Text className="text-xl text-white">Update Item</Text>:
            <Text className="text-xl text-white">Edit Item</Text>}
          </TouchableOpacity> */}
            <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
            onPress={onDelete}>
            <Text className="text-xl text-white">Delete</Text>
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
              <Text className="text-white text-xl">{nameState}</Text>
          </View>
          {paragraph===null?null:
          <View>
            <View className="my-5 mx-1 flex-row align-middle">
              <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
                            onPress={editParagraph}>
                  <Text className="text-xl text-white">{buttonName}</Text>
              </TouchableOpacity>
            </View>
          <View className=" bg-gray-800 py-2">
              <Text className="text-white text-2xl mr-2 mb-2">Paragraph </Text>
              {isEditing?
              <TextInput 
              className="flex-1 bg-white text-xl" 
              numberOfLines={10}
              placeholder={paragraphState}  value={paragraphState} Name='text' 
              onChangeText={text => setParagraph(text)}/>:
              <Text className="text-white text-xl">{paragraphState}</Text>}
          </View>
          </View>}
          {paragraph===null?
          <View>
          <View><Text className="text-2xl my-2 ml-2 text-white">Items</Text></View>
          {itemResponses.map((item,index)=>(
            <Item topicId={id} itemId={item.id} text={item.text} index={index} topicType={topicType}/>
          ))}
          <TextInput 
              className="flex-1 bg-white text-xl mx-3 my-2" numberOfLines={2}
              placeholder={item}  value={item} Name='text' 
              onChangeText={text => setItem(text)}/>
          <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
            onPress={addItem}>
            <Text className="text-xl text-white">Add Item</Text>
          </TouchableOpacity>
          </View>:null}
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default TopicDescription;