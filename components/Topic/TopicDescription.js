import { View, Button,Text,SafeAreaView,ScrollView,TouchableOpacity,TextInput,
    CheckBox
  } from 'react-native'
  import React, { useState,useContext,useEffect } from 'react'
  import SelectPicker from 'react-native-form-select-picker';
import { updateTopicParagraph,addTopicItem,deleteTopicItem, modifyTopicParams, deleteTopic } from '../../api/TopicAPI';
  import { useLayoutEffect } from 'react';
  import { useNavigation,useRoute } from '@react-navigation/native';
  import { ArrowLeftIcon } from 'react-native-heroicons/solid';

  import { UserContext } from '../../context/UserContext';
  import { ConfigContext } from '../../context/ConfigContext';
  import { ActiveContext } from '../../context/ActiveContext';
  import DateTimePicker from 'react-native-modal-datetime-picker';
  import TrashIcon from 'react-native-heroicons/solid';
  import SubTopic from "./SubTopic";
  import LinkItem from "./LinkItem";
  import AddSubTopicForm from "./AddSubTopicForm";
  import AddLinkForm from "./AddLinkForm";
  import { getTopicDescription } from '../../api/TopicAPI';
  import { PlusIcon } from 'react-native-heroicons/solid';
  
  const TopicDescription = () => {
    const {params:{id,createdAt,updatedAt,name,skillType}} = useRoute();
    const [isEditing,setIsEditing] = useState(false);
    const {user, setUser} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
    const [nameState,setName] = useState(name);
    const [summary,setSummary] = useState('');
    const [description,setDescription] = useState('');
    const [links, setLinks] = useState([]);
    const [subTopics,setSubTopics] = useState([])
    const [showSubTopics,setShowSubTopics] = useState(false)
    const [showLinks, setShowLinks] = useState(false)
    const [showAddSubTopic,setShowAddSubTopic] = useState(false)
    const [showAddLink,setShowAddLink] = useState(false)

    useEffect(()=>{
      getTopic(config,'Bearer '+user.accessToken,id)
    },[])


    const getTopic = async(config,bearerToken,id) =>{
      const record = await getTopicDescription(config,bearerToken,id)
      setName(record.name)
      setSummary(record.summary)
      setDescription(record.description)
      setLinks(record.linkResponses)
      setSubTopics(record.subTopicResponses)
      setShowAddSubTopic(false)
      setShowAddLink(false)
    }
  

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

    const onUpdate = async() =>{
      if(isEditing){
        await modifyTopicParams(config, 'Bearer '+user.accessToken,
        id,nameState,summary,description);
        setIsEditing(false);
      }
      else{
        setIsEditing(true);
      }
  };
  const onDelete = async() =>{
    await deleteTopic(config,'Bearer '+user.accessToken,id)
    navigation.navigate("Normal",{skillType})
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
            <View className="mt-5 mb-3">
              <Text className="text-white text-xl font-bold">Summary</Text>
              {isEditing?
                <TextInput 
                className="flex-1 bg-white text-xl"
                multiline={true}
                numberOfLines={10}
                placeholder={String(summary)}  value={summary} Name='text' 
                onChangeText={text => setSummary(text)}/>:
                <Text className="text-white text-xl">{summary}</Text>}
            </View>
            <View className="mt-5 mb-3">
              <Text className="text-white text-xl font-bold">Description</Text>
              {isEditing?
                <TextInput 
                className="flex-1 bg-white text-xl"
                multiline={true}
                numberOfLines={10}
                placeholder={String(description)}  value={description} Name='text' 
                onChangeText={text => setDescription(text)}/>:
                <Text className="text-white text-xl">{description}</Text>}
            </View>
            <View className="mt-5 mb-3">
              <Text className="text-white text-xl font-bold">Sub Topics</Text>
            </View>
          {subTopics?.map((subTopic,index)=>(
            <SubTopic topicId={id} id={subTopic.id} record={subTopic} 
            index={index} refreshFunction={getTopic}/>
          ))}
          <View className="mt-5 mb-3">
            <Text className="text-white text-xl font-bold">Links</Text>
          </View>
          {links?.map((link,index)=>(
            <LinkItem topicId={id} id={link.id} record={link} 
            index={index} refreshFunction={getTopic}/>
          ))}
          <View className="flex-row mt-5 mb-3">
            <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
              onPress={()=>setShowAddSubTopic(!showAddSubTopic)}>
              <Text className="text-xl text-white">Add Sub Topic</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
              onPress={()=>setShowAddLink(!showAddLink)}>
              <Text className="text-xl text-white">Add Link</Text>
            </TouchableOpacity>
          </View>
          {showAddSubTopic?<AddSubTopicForm topicId={id} refreshFunction={getTopic}/>:null}
          {showAddLink?<AddLinkForm topicId={id} refreshFunction={getTopic}/>:null}
        </ScrollView>
      </SafeAreaView>
    )
  }
  
  export default TopicDescription;