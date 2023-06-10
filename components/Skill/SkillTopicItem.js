import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
// import AddChildSkillForm from './AddChildSkillForm';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import { removeTopicFromSkill } from '../../api/SkillAPI';
import {TrashIcon} from 'react-native-heroicons/solid';

const SkillTopicItem = (props) => {
  const [skillId,setSkillId] = useState(props.skillId)
  const [topicId,setTopicId] = useState(props.topicId)
  const [showDescription, setShowDescription] =useState(false);
  const {user, setUser} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [record,setRecord] = useState('')

  const onDelete = async() =>{
      await removeTopicFromSkill(config,'Bearer '+ user.accessToken,skillId,topicId)
  }
  var id = props.record.id
  var createdAt = props.record.createdAt
  var updatedAt = props.record.updatedAt
  var name = props.record.name
  var paragraph = props.record.paragraph
  var itemResponses = props.record.itemResponses
  var topicType = props.record.topicTypeEnum

  const navigation = useNavigation();

const onShowDescription = async() =>{
  navigation.navigate("Topics",{screen:'Description',params:{id,createdAt,updatedAt,name,paragraph,
    itemResponses,topicType}})
}
     

  return (
    <View className="flex">
        <View className="flex flex-row flex-1">
            <View className="w-3/5 flex-row">
                <Text className="text-xl text-white">{props.index+1}. {props.name}</Text>
                <TouchableOpacity >
                    <ArrowTopRightOnSquareIcon color="white" size={20} 
                    onPress={onShowDescription} onClick={onShowDescription}/>
                </TouchableOpacity>
            </View>
            <View className="w-1/5">
              <TouchableOpacity onPress={onDelete}>
                  <TrashIcon color="white" size={30} />
              </TouchableOpacity>
            </View>
        </View>
    </View>
  )
}

export default SkillTopicItem