import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { completeGoal, deleteCompletedRule, deleteGoal, deleteWorkRule} from '../../api/GoalAPI';
// import AddChildGoalForm from './AddChildGoalForm';
import {TrashIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const RuleItem = (props) => {
    
  const [name,setName] = useState(props.name);
	const {user} = useContext(UserContext);
    const {config} = useContext(ConfigContext);

	const onDelete = async() =>{
		if(props.type==="Completed"){
			await deleteCompletedRule(config,'Bearer '+user.accessToken,props.id)
		}
		else{
			await deleteWorkRule(config,'Bearer '+user.accessToken,props.id)
		}
		
		await props.refreshFunction(user.id,config,'Bearer '+user.accessToken)
	}

  return (
        <View className="flex flex-row">
            <View className="flex-1">
              < Text className="text-xl text-white">{name}</Text>
            </View>
            <View>
              <TouchableOpacity
                   onPress={onDelete}>
                  <TrashIcon color="white" size={30}/>
              </TouchableOpacity>
            </View>
        </View>
  )
}

export default RuleItem