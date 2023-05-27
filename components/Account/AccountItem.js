import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { completeAccount, deleteAccount} from '../../api/AccountAPI';
import AccountDescription from './AccountDescription';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const AccountItem = (props) => {
    var one_day = 1000*60*60*24
    var id = props.record.id;
    var createdAt = props.record.createdAt;
    var updatedAt = props.record.updatedAt;
    var name = props.record.name;
    var startDate = props.record.startDate;
    var accountTypeName = props.record.accountTypeName;
    var description = props.record.description;
    var liquidity = props.record.liquidity;
    var freeLiquidity = props.record.freeLiquidity;
    var active = props.record.active;
    var hidden = props.record.hidden;
    var completed = props.record.completed;
    var balance = props.record.balance;
    var nomineeName = props.record.nomineeName;
    var maturityDate = props.record.maturityDate;
    var stockCode = props.record.stockCode;
    var schemeCode = props.record.schemeCode

	const [showDescription, setShowDescription] =useState(false);
	const [showAddAccount,setShowAddAccount] = useState(false);
	const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
	const {showActive} = useContext(ActiveContext);
  const navigation = useNavigation();

	const onShowDescription = async() =>{
		navigation.navigate("Description",{id,createdAt,updatedAt,name,startDate,
      accountTypeName,description,balance,liquidity,freeLiquidity,
      active,hidden,completed,nomineeName,maturityDate,stockCode,schemeCode})
	}

     

  return (
    <View className="flex flex-row">
        <View className="flex-1 flex-row">
                <Text className="text-xl">{props.record.name}</Text>
                <TouchableOpacity >
                    <ArrowTopRightOnSquareIcon color="black" size={20} 
                    onPress={onShowDescription} onClick={onShowDescription}/>
                </TouchableOpacity>
        </View>
        <View>
          <Text className="text-lg">Rs {props.record.balance}</Text>
        </View>
    </View>
  )
}

export default AccountItem