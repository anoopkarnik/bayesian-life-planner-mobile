import { View, Text,TextIXCircleIconnput,TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext, useCallback} from 'react'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { ActiveContext } from '../../context/ActiveContext';
import { completeTransaction, deleteTransaction} from '../../api/TransactionAPI';
import TransactionDescription from './TransactionDescription';
import {PlusCircleIcon,MinusCircleIcon,ArrowTopRightOnSquareIcon,CheckIcon}  
from "react-native-heroicons/solid";
import { useNavigation } from '@react-navigation/native';

const TransactionItem = (props) => {
    var one_day = 1000*60*60*24
    var id = props.record.id;
    var createdAt = props.record.createdAt;
    var updatedAt = props.record.updatedAt;
    var name = props.record.name;
    var startDate = props.record.startDate;
    var accountName = props.record.accountName;
    var accountTypeName = props.record.accountTypeName;
    var categoryName = props.record.categoryName;
    var expenseName = props.record.expenseName;
    var subCategoryName = props.record.subCategoryName;
    var description = props.record.description;
    var active = props.record.active;
    var hidden = props.record.hidden;
    var completed = props.record.completed;
    var cost = props.record.cost;


	const [showDescription, setShowDescription] =useState(false);
	const [showAddTransaction,setShowAddTransaction] = useState(false);
	const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
	const {showActive} = useContext(ActiveContext);
  const navigation = useNavigation();

	const onShowDescription = async() =>{
		navigation.navigate("Description",{id,createdAt,updatedAt,name,startDate,
      accountName,accountTypeName,categoryName,expenseName,
      subCategoryName,description,active,hidden,completed,cost})
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
          <Text className="text-lg">Rs {props.record.cost}</Text>
        </View>
    </View>
  )
}

export default TransactionItem