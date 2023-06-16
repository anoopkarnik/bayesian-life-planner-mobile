import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
// import AddChildGoalForm from './AddChildGoalForm';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const TopicItem = (props) => {
    
  var id = props.record.id
  var createdAt = props.record.createdAt
  var updatedAt = props.record.updatedAt
  var name = props.record.name
  var skillType = props.name

	const [showDescription, setShowDescription] = useState(false);
	const { user } = useContext(UserContext);
	const { config } = useContext(ConfigContext);

  const navigation = useNavigation();

	const onShowDescription = async() =>{
    navigation.navigate("Description",{id,createdAt,updatedAt,name,skillType})
	}

  return (
    <View className="flex">
      <View className="flex-1 flex-row">
        <Text className="text-xl">{props.record.name}</Text>
          <TouchableOpacity>
            <ArrowTopRightOnSquareIcon color="black" size={20} 
              onPress={onShowDescription} onClick={onShowDescription}/>
          </TouchableOpacity>
      </View>
    </View>
  )
}

export default TopicItem