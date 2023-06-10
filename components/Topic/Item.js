import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl,Linking } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { deleteTopicItem } from '../../api/TopicAPI';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon,TrashIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const Item = (props) => {
    
  const {user, setUser} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  
  const onDelete = async() =>{
    await deleteTopicItem(config,'Bearer '+user.accessToken,props.topicId,props.itemId)
  }

  const onPressText = async() =>{
    if (props.topicType=="TOPIC_URL"){
      Linking.openURL(props.text);
    }
  }
  return (
    <View className="flex">
      <View className="flex-1 flex-row">
        <View className="w-4/5">
          <TouchableOpacity onPress={onPressText}>
            <Text className="text-xl text-white">{props.index}. {props.text}</Text>
          </TouchableOpacity>
        </View>
        <View className="w-1/5">
          <TouchableOpacity>
            <TrashIcon color="white" size={30} onPress={onDelete}/>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Item