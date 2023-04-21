import { View, Text,TextInput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import { updatePlanPercentage } from '../../api/BudgetAPI';

const FundSummaryItem = (props) => {

  const [isEditing,setIsEditing] = useState(false);
  const [planPercentage,setPlanPercentage] = useState(props.budget.planPercentage);
  const {user, setUser} = useContext(UserContext);
  const {config} = useContext(ConfigContext)

  const onEdit = async() =>{
		if(isEditing){
			await updatePlanPercentage(props.budget.id,config,'Bearer '+user.accessToken,planPercentage)
			await props.refreshFunction(user.id,config,'Bearer '+user.accessToken)
		}
		setIsEditing(!isEditing);
	}

     

  return (
    <View className="flex flex-row">
        <View className="flex-1 flex-row">
            <View className="bg-green-200 rounded-xl py-3 px-5 my-4 mx-3">
                <View className="flex-row">
                  <Text>
                    {props.budget.expenseName}: 
                    {String(props.budget.transactionPercentage)} | 
                  </Text>
                  {isEditing?        
                    <TextInput 
                    className="flex-1 bg-white"
                    placeholder="Plan Percentage"  value={planPercentage} Name='text' 
                    onChangeText={text => setPlanPercentage(text)}/>:
                    <Text>{planPercentage}</Text>}
              </View>
              <View>
                <TouchableOpacity onPress={onEdit} 
                className="m-2 bg-gray-300 px-5 py-3  rounded-xl">
                    {isEditing?<Text>Update</Text>:<Text>Edit</Text>}
                </TouchableOpacity>
              </View>
            </View>  
        </View>
    </View>
  )
}

export default PlanPercentageItem