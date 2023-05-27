import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../../context/UserContext';
import { ConfigContext } from '../../../context/ConfigContext';
import { ActiveContext } from '../../../context/ActiveContext';
// import AddChildGoalForm from './AddChildGoalForm';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const ChildRuleEngineItem = (props) => {
    

  return (
    <View className="flex">
      <View className="flex-row ml-5">
          <Text className="text-xl">{props.record.name}</Text>
      </View>
    </View>
  )
}

export default ChildRuleEngineItem