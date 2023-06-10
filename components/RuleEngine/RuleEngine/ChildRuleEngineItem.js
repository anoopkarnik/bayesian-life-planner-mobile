import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
import {TrashIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';
import {removeCriteriaFromCriteriaSet,removeCriteriaSetFromRule,
  removeRuleFromRuleSet} from '../../../api/RuleEngineAPI';

const ChildRuleEngineItem = (props) => {

  const { user } = useContext(UserContext);
	const { config } = useContext(ConfigContext);

	const onDelete = async()=>{
		if (props.name === "Criteria Set") {
			await removeCriteriaFromCriteriaSet(config, 'Bearer ' + user.accessToken,
			 props.id,props.record.id)
		}
		else if (props.name === "Rule") {
			await removeCriteriaSetFromRule(config, 'Bearer ' + user.accessToken, 
			props.id,props.record.id)
		}
		else if (props.name === "Rule Set") {
			await removeRuleFromRuleSet(config, 'Bearer ' + user.accessToken, 
			props.id,props.record.id)
		}

		await props.refreshFunction(config, 'Bearer ' + user.accessToken, props.criteriaType)

	}
    

  return (
    <View className="flex flex-row">
      <View className="flex-row w-3/4 ml-5">
          <Text className="text-xl">{props.record.name}</Text>
      </View>
      <View className="w-1/4">
        <TrashIcon color="black" size={30} onPress={onDelete}/>
      </View>
    </View>
  )
}

export default ChildRuleEngineItem