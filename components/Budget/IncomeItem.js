import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import {TrashIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import { deleteIncome } from '../../api/BudgetAPI';

const IncomeItem = (props) => {

	const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
	const {showActive} = useContext(ActiveContext);
  const navigation = useNavigation();

  const deleteIncomeRow = async()=>{
    await deleteIncome(config,'Bearer '+user.accessToken,props.income.id)
    await props.refreshFunction(config,'Bearer '+user.accessToken)
  }
     

  return (
    <View className="flex-row py-3 px-2 bg-gray-400">
      <Text className="text-lg flex-1">
        {props.income.name}
      </Text>
      <Text className ="text-lg mx-2">
        {props.income.income}
      </Text>
      <TouchableOpacity
        onPress={deleteIncomeRow}>
        <TrashIcon color="orange" size={20}/>
      </TouchableOpacity>
    </View>
  )
}

export default IncomeItem