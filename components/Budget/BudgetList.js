import { View, Text,TextInput, TouchableOpacity,RefreshControl } from 'react-native'
import React,{useState,useContext,useEffect} from 'react'
import BudgetItem from './BudgetItem'
import { UserContext } from '../../context/UserContext';
import { ConfigContext } from '../../context/ConfigContext';
import { getMonthlyBudget } from '../../api/BudgetAPI';
import { PlusCircleIcon } from 'react-native-heroicons/solid';
import { useIsFocused } from '@react-navigation/native';
import AddBudgetForm from './AddBudgetForm';
import DateToString from '../utils/DateToString';

const BudgetList = (props) => {
  const {user} = useContext(UserContext);
  const {config} = useContext(ConfigContext);
  const [records, setRecords] = useState([]);
  const [showBudget, setShowBudget] = useState(false);
  const [showAddBudget, setShowAddBudget] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    isFocused && refreshBudget(props.name,config,'Bearer '+user.accessToken)
  }, [isFocused]);

  const refreshBudget = async(name,backend_url,bearerToken) =>{
    // await props.refreshFunction(backend_url,bearerToken,habit)
    const record = await getMonthlyBudget(props.name,config,'Bearer '+user.accessToken);
    setRecords(record);
    setShowAddBudget(false)

  }

  const onshowAddBudget = async() =>{
    setShowAddBudget(true);
  }

  const onHideAddBudget= async() =>{
    setShowAddBudget(false);
  }	

  return (
    <View >
      <View>
      </View>
      <View className="flex-row py-3 px-2 bg-[#556581]">
        <TouchableOpacity 
          onPress={()=>setShowBudget(!showBudget)} className="flex-1 ">
            <Text className="text-xl text-white font-bold">{props.name}</Text>
        </TouchableOpacity>
        <Text className="text-white font-xl mx-2">
          Rs {props.value1} | {props.value3} | {props.value2}
        </Text>
        <TouchableOpacity
             onPress={()=>{setShowAddBudget(!showAddBudget)}}>
          <PlusCircleIcon color="white" size={25}/>
        </TouchableOpacity>
      </View>
      {showBudget?
      <View>
        <View className="bg-gray-400 py-3 px-2">
            {records?.map((record)=>(
                <BudgetItem record={record} key={record.id}
                refreshFunction={refreshBudget}/>
            ))}
        </View>
      </View>:null}
      {
        showAddBudget?
        <AddBudgetForm refreshFunction={refreshBudget} 
        expenseName={props.name}/>:null
      }
    </View>
  )
}

export default BudgetList