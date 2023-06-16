import { View, Text,TextInput,TouchableOpacity,RefreshControl,Linking } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { removeLinkFromTopic,modifyLinkParams, removeSubTopicFromTopic, modifySubTopicParams } from '../../api/TopicAPI';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon,TrashIcon,PencilIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import { PlusIcon } from 'react-native-heroicons/solid';

const SubTopic = (props) => {
    
  const {user, setUser} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [showDetails, setShowDetails] = useState(false)
  const [isEditing,setIsEditing] = useState(false);
  const [name,setName] = useState(props.record.name)
  const [text,setText] = useState(props.record.text)
  
  const onDelete = async() =>{
    await removeSubTopicFromTopic(config,'Bearer '+user.accessToken,props.id,props.topicId)
    await props.refreshFunction(config,'Bearer '+user.accessToken,props.topicId)
  }
  
  const onEdit = async() =>{
    if (isEditing===false){
      setIsEditing(true)
    }
    else
    {
      await modifySubTopicParams(config,'Bearer '+user.accessToken,props.id,name,text)
      setIsEditing(false)
    }
  }
  const onPressText = async() =>{
      Linking.openURL(url);

  }
  return (
    <View className="flex">
      <View className="flex flex-row flex-1">
        <View className="flex-1 flex-row">
            <PlusCircleIcon onPress={()=>setShowDetails(!showDetails)} color="white" height={30} width={20}/>
            <Text className="text-white text-xl mx-2">Name - </Text>
              {isEditing?
                <TextInput 
                className="bg-white text-xl" placeholder={name}  value={name} Name='name' 
                onChangeText={text => setName(text)}/>:
            <Text className="text-white text-xl mx-2">{name}</Text>}
        </View>
        <View >
          <TouchableOpacity>
            <TrashIcon color="white" size={30} onPress={onDelete}/>
          </TouchableOpacity>
        </View>
      </View>
      {showDetails?
        <View>
            <View className=" bg-gray-800 py-2 mt-3">
                {isEditing?
                    <TextInput className="flex-1 bg-white text-xl" numberOfLines={10}
                        placeholder={text}  value={text} Name='Text' 
                        onChangeText={text => setText(text)}/>:
                    <Text className="text-white text-xl">{text}</Text>}
            </View>
            <View className="flex-row mt-5 mb-3">
              <TouchableOpacity className="bg-gray-600 mx-2 rounded-lg p-2" 
                onPress={onEdit}>
                <Text className="text-xl text-white">Edit</Text>
              </TouchableOpacity>
            </View>
        </View>:null}
    </View>
  )
}

export default SubTopic