import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
// import AddChildGoalForm from './AddChildGoalForm';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const RuleItem = (props) => {
    var id = props.record.id;
    var createdAt = props.record.createdAt;
    var updatedAt = props.record.updatedAt;
    var name = props.record.name;
    var description = props.record.description;
    var active = props.record.active;
    var hidden = props.record.hidden;
    var ruleType = props.record.ruleType;
    var weightage = props.record.weightage;
    var value = props.record.value;
    var conditionType = props.record.conditionType;

	const [showDescription, setShowDescription] =useState(false);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);
	const {showActive} = useContext(ActiveContext);
  const navigation = useNavigation();

	const onShowDescription = async() =>{
    navigation.navigate("RuleDescription",{id,createdAt,updatedAt,name,description,
    active,hidden,ruleType,weightage,value,conditionType})
	}

  return (
    <View className="flex">
        <View className="w-3/5 flex-1 flex-row bg-gray-400 py-3 px-2">
          <Text className="text-xl">{props.record.name}</Text>
          <TouchableOpacity >
            <ArrowTopRightOnSquareIcon color="black" size={20} 
              onPress={onShowDescription} onClick={onShowDescription}/>
          </TouchableOpacity>
        </View>
    </View>
  )
}

export default RuleItem