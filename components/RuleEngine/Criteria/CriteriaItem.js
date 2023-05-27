import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
// import AddChildGoalForm from './AddChildGoalForm';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const CriteriaItem = (props) => {
    
  var id = props.record.id
  var createdAt = props.record.createdAt
  var updatedAt = props.record.updatedAt
  var name = props.record.name
  var condition = props.record.condition
  var category = props.record.category
  var criteriaType = props.record.criteriaType
  var active = props.record.active
  var value = props.record.value
  var categoryName = props.record.categoryName
  var weightage = props.record.weightage

	const [showDescription, setShowDescription] = useState(false);
	const { user } = useContext(UserContext);
	const { config } = useContext(ConfigContext);

	const onDelete = async () => {
			await deleteCriteria(config, 'Bearer ' + user.accessToken, props.record.id)
			await props.refreshFunction(config, 'Bearer ' + user.accessToken,props.record.criteriaType)
	}
  const navigation = useNavigation();

	const onShowDescription = async() =>{
    navigation.navigate("Description",{id,createdAt,updatedAt,name,condition,
    category,criteriaType,active,value,categoryName,weightage})
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

export default CriteriaItem